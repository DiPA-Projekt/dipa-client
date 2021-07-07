# kol-breadcrumb



<!-- Auto Generated Below -->


## Properties

| Property              | Attribute | Description                                                                                                                                                                                             | Type                                      | Default     |
| --------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- | ----------- |
| `_crumbs`             | `_crumbs` | <span style="color:red">**[DEPRECATED]**</span> Property wird im RC-Stadium entfernt. Es soll das _links-Property verwendet werden.<br/><br/>Gibt die geordnete Liste der Seitenhierarchie in Links an. | `BreadcrumbLink[] \| string \| undefined` | `undefined` |
| `_links` _(required)_ | `_links`  | Gibt die geordnete Liste der Seitenhierarchie in Links an.                                                                                                                                              | `BreadcrumbLink[] \| string`              | `undefined` |


## Dependencies

### Depends on

- [kol-icofont](../icofont)
- [kol-link](../link)

### Graph
```mermaid
graph TD;
  kol-breadcrumb --> kol-icofont
  kol-breadcrumb --> kol-link
  kol-link --> kol-icofont
  style kol-breadcrumb fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


