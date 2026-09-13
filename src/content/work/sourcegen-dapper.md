---
title: DreamBig.SourceGen.Dapper
summary: A Roslyn source generator that writes typed Dapper repositories, Unit of Work and DI registrations, with provider-specific SQL, at compile time.
tech:
  - C#
  - .NET 8 / .NET 10
  - Roslyn source generators
  - Dapper
  - SQL Server
  - PostgreSQL
  - SQLite
  - MySQL / MariaDB
repository: https://github.com/azthrun/dreambig-sourcegen-dapper
featured: true
order: 1
status: In development (version 0.1). Not yet published to NuGet.
---

## Summary

DreamBig.SourceGen.Dapper generates the data-access layer that Dapper users usually write by hand. You describe entities and repository interfaces with attributes and naming conventions; at compile time the generator emits the repository implementations, the SQL they run, Unit of Work types that manage transactions, and the dependency injection registrations. SQL is generated for the provider you choose: SQL Server, PostgreSQL, SQLite or MySQL/MariaDB.

## Problem

Dapper is fast and transparent, but it leaves the repetitive parts to you. Every table needs the same insert, update, delete, get-by-id, paging and count methods, each with a SQL string kept in step with the entity by hand. A renamed property or a mistyped parameter name compiles fine and fails at runtime. Supporting a second database means rewriting that SQL for its dialect.

The library keeps Dapper underneath and generates that repetitive code instead, so repository code stays small, typed and consistent.

## My role

I designed and built the library on my own: the attribute API and naming conventions, the source generator, the compile-time diagnostics, the four provider packages, the test suites and the documentation.

## Approach & key decisions

**Generate at compile time, not at runtime.** The generator is a Roslyn source generator, so repository code and SQL exist before the application runs. SQL isn't assembled at runtime, and the generated code can be read and debugged like any other source.

**Conventions first, with an explicit escape hatch.** Methods are classified by name (`Insert*`, `GetById*`, `GetPage*`, `Count*`, `Exists*` and so on), and `By{Property}` clauses become typed `WHERE` filters. When a name doesn't fit, `[DbOperation]` states the operation explicitly, and `[DbQuery]`, `[DbJoin]` and `[DbStoredProcedure]` cover joins and stored procedures.

```csharp
[DbRepository]
public interface ICustomerRepository
{
    Task<Customer?> GetCustomerByEmail(string email, CancellationToken ct);
    Task<PagedResult<Customer>> GetPageCustomers(int skip, int take, CancellationToken ct);
}
```

**Report mistakes at compile time instead of guessing.** Problems surface as compiler diagnostics with IDs (`DBSGD001` and up): a missing key, an unknown property in a `By` clause, a query parameter that matches no method parameter, paging parameters the generator can't identify by name. The generator flags them rather than silently choosing a likely meaning.

**Make the generated SQL visible.** Every generated repository exposes the exact SQL it executes as constants in a nested `Sql` class, so it can be reviewed, logged or asserted on in tests.

**One package per provider, SQL decided at compile time.** Each database has its own package with dialect-specific SQL: `OUTPUT INSERTED` on SQL Server, `RETURNING` on PostgreSQL and SQLite, and a batched `LAST_INSERT_ID()` select on MySQL/MariaDB. MySQL and MariaDB deliberately share one code path, without MariaDB's newer `RETURNING`, so no SQL depends on detecting the server version at runtime.

**Transactions and wiring included.** `[DbUnitOfWork]` interfaces expose repositories as properties and get generated `BeginTransactionAsync`, `CommitAsync` and `RollbackAsync`. A generated `AddDreamBigDapperGenerated()` registers every repository and Unit of Work as scoped services.

**Testable without database infrastructure.** The SQLite provider lets consumers run the same generated repositories against an in-memory database in integration tests.

## Tech

- C#, with runtime packages targeting .NET 8 and .NET 10
- Roslyn source generator targeting .NET Standard 2.0, as the analyzer host requires
- Dapper, with provider packages for SQL Server, PostgreSQL, SQLite and MySQL/MariaDB
- Generator tests plus SQLite integration tests

## Outcome / current status

The library is at version 0.1 and not yet published to NuGet, so there are no downloads or adoption figures to report. CRUD, filtered and bulk operations, paging with total counts, streaming reads, joins, stored procedures with output parameters, optimistic concurrency, Unit of Work and all four providers are implemented and documented.

Known limitations are documented too: stored procedures map a single result set, and multi-mapping into nested object graphs isn't generated yet. Open items on the project's to-do list include integration tests for SQL Server, PostgreSQL and MySQL, multiple result sets, multi-mapping and code fixes for common diagnostics.
