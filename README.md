## Postgres implementation for [Memcards](../README.md)

Because I'm going to be constantly rebuilding the backend to learn to new tech, I design the [API controller](./src/main.controller.ts) to be loosely coupled, to easily swap-out services _(AWS, MySQL, Azure, ect..)_. With that, I just have to create a new class that implements the [DataService interface](./src/services/dataService.types.ts) and change 2-3 lines of code in the [app file](./src/app.ts) to use it.

---
