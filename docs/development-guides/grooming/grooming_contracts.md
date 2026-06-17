# Goal

* Your task is to detail out the tech specifications/requirements of the task/user story given to you.
* Your aim is to build the Tech specs that translate product intent into precise, buildable system definitions.
* You are specifically concentrating on API contracts and Schemas
* You should also think about performance and security. However, as we are a startup, the performance and security are not the topmost prioroty. I bigger priority is the time and complexity of implementation.
* NFRs are not a requirement as of now.

# Supporting Documents

* You will be given a document containing details of the task that has to be completed.
* You will also be given a Figma design link containing the designs of the tasks to be completed.

## API contract

* You have to think Schema first.
* Look at the current APIs and current schemas in the concerning files in the nrev-ui-2 repo.
* Figure out what changes are needed in API and / or what new APIs need to be created.
* Do not go about suggesting new APIs if some changes/enhancements in an existing API will suffice.
* However, do not force fit different business logic requirements into the same APIs.
* How many APIs need to be created and maintained should always be looked at from Behaviour Driven Design, domain separation as well as Best API design guidelines
* If you are suggesting enhancements in existing API, also suggest backward compatibility plans.
* You need to think from the perspective of APIs, schemas, edge cases, performance, security
* You need to think about the technical trade-offs and technical design decisions.
* While creating the contracts, you need to consider the following things
  * The behaviour of every button needs to be thought about.
  * If there is a listing, we need to decide the default sort order
  * If there is a listing we have to prepare for pagination/infinite scrolling
  * If API fails, We should highlight the failures and error messages. We should think from the user perspective as to what structured error message and error code makes it easy for FE to show the ligible error message to user. Example - 400 with "You need to provide prompt as a mandatory field" is a better error response than 500 with "Something Went wrong
  * While deciding the API schema, unless absolutely unavoidable due to unknown structure, always prefer types and structured response over things like `Record<string, string | number>` or open dict etc

# Documenation strategy

* Dont be unnecessarily verbose. While being clear, do not add too much information in the documentation which is not needed, or goes beyond scope.
* Make the documention read like it has to be shared as a contract between FE and BE and it should have the contract changes, what exists in the APIs and do not need change as well as the user flow mermaids. You should also the justifications or requirements for the changes.
* Any other implementaiton or details around how we got there, should be skipped from this documentation.
* \[STRICT\] The documentation should be completely clear on the High level design and approach and tech specs, but should leave implementation details to be filled in later iterations.
* \[STRICT\] Do not go about adding FE and BE implementation details as of yet. Just concentrate on the contracts and tech specs and HLDs.
* \[STRICT\] No code can/should be created at this step of the process.
* **Prioritise colored mermaid diagrams wherever possible — a picture is worth a thousand words while explaining concepts.** Use them for user journeys, API call sequences (FE ↔ BE), and contract change diffs.
* Color the diagrams using `classDef` so intent is visually obvious (success / error / neutral, FE / BE / external, new vs existing endpoints). Keys: `fill` (background), `stroke` (border), `color` (text). Color edges with `linkStyle 0 stroke:#666CFF,stroke-width:2px`. Example:

```mermaid
flowchart LR
    A[Start] --> B{Decision}
    B -->|yes| C[Success path]
    B -->|no| D[Error path]
    classDef good fill:#d4f4dd,stroke:#2d8f3f,color:#0a3d1a
    classDef bad fill:#fde2e2,stroke:#c43d3d,color:#5a0e0e
    classDef neutral fill:#e3e8ff,stroke:#666CFF,color:#1a1f4d
    class A neutral
    class C good
    class D bad
```

* **Keep the documentation short.** Too much verbosity kills the purpose of the documentation — readers skim. Lead with the diagram, then add only the bullets needed to disambiguate it.

## Linking back to PRD / grooming sources

* **\[STRICT\] Every reference to a section of the source PRD or grooming doc MUST be a clickable markdown link directly to the section heading anchor in the source file** — not a bare `§X` or `(PRD §145)` token. The reader must be able to click and land on the cited paragraph.
* Use relative paths from the contract file to the source doc (e.g. `../prd/<feature>_grooming.md#<anchor>`). GitHub auto-generates heading anchors from heading text — lowercase, spaces → `-`, punctuation stripped or collapsed to `-`. Verify before committing.
* Example — bad: `auto-suffix on collision (grooming §B). The returned name may differ...`
* Example — good: `auto-suffix on collision ([grooming §B · Table view](../prd/feature_grooming.md#b-table-view)). The returned name may differ...`
* Include the section label inside the link text (`§B · Table view`, not just `§B`), so readers skimming the contract can see *what* the link points to without clicking.
* At the **top of every per-screen contract file**, include a `**Grooming §:**` line (and where useful a `**PRD reference:**` line) with hyperlinks to the canonical source sections that screen draws from. This sets up the context without forcing the reader to hunt.
* When a single sentence touches multiple grooming sections, link each one inline: `... per [grooming §B](...) and [§M](...) ...`.
* For inline TypeScript / JSON code blocks where markdown links don't render, leave the section reference as plain text with the section's full name (e.g. `// see grooming §G.2 · Live-block scope and the plays caveat`) — never just `§G.2`.
* **Never use raw line numbers** (`§145`, `§249`) as section pointers — line numbers shift the moment the source doc is edited. Always anchor on a stable heading. If the heading is too coarse, link to the heading and quote the relevant phrase in the contract text.

## Structure — organise by entity, not by screen

* **\[STRICT\] One contract per entity / resource, not one per screen.** Per-screen files cause the same endpoint to be redeclared in multiple places — the FE reads one, the BE reads another, they drift. Always keep a single source of truth per endpoint.
* The canonical layout for a contracts folder:
  * `00_index_and_conventions.md` — URL prefixes, naming, error shape, pagination/sort/filter defaults, write semantics, and a **screen → endpoint map** so designers can land on a screen and find which endpoints render it.
  * `01_schemas.md` — every DTO and enum used anywhere in the bundle, with required / optional / nullable explicit. Other files reference these by name and do NOT redeclare them.
  * `02_<entity>.md`, `03_<entity>.md`, … — one file per resource (e.g. `02_tables.md`, `03_columns.md`, `04_rows.md`, `05_csv.md`). Each lists its endpoints, the screens that use them, request / response, error codes, default behaviour, and edge cases.
  * `07_common_states.md` (or similar) — skeletons, toasts, idempotency, cancellation, trigger-fire rules — anything cross-cutting.
  * `98_open_questions.md` — parked decisions.
* Inside each entity file, every endpoint section names the screens that depend on it (e.g. `Used by screens: 02, 16`). This is the inverse of putting the endpoint in each screen file — designers can still find their answer, but engineers maintain only one copy.
* **\[STRICT\] Do not embed FE service-layer code, hook signatures, or sample axios calls in contracts.** Contracts describe the wire format — request body shape, response body shape, status codes, error codes. Implementation belongs in the codebase, not the spec. Code in the spec bloats reading time and drifts the moment the FE engineer makes a different naming call.
* For DTOs in `01_schemas.md`, mark every field with explicit optionality: `field: T` for required non-null, `field?: T` for optional key, `field: T \| null` for required key / nullable value, `field?: T \| null` for both. Comments inline explain semantics. Do not paraphrase the schema in prose elsewhere — refer back.
* When a state machine spans multiple endpoints (e.g. Delete table A/B/C → `GET /usage` → `DELETE`), draw the mermaid **once** in the entity file that owns the destructive endpoint. Other files referencing the flow link to it.

## Mermaid hygiene

* **\[STRICT\] Wrap any mermaid node label that contains `{`, `}`, `(`, or `)` in double quotes** — these characters are reserved for shape syntax and break the parser otherwise. Example — bad: `Done[Navigate to /tables/{id}]`. Example — good: `Done["Navigate to /tables/{id}"]`.
* `Type{Decision label}` (curly-brace diamond) and `DB[(Database label)]` (cylinder) are valid mermaid shapes — leave those un-quoted; the quoting rule applies only to *content* characters inside `[...]` text labels.