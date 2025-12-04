# Architecture

The architecture of the Dinhero is designed to be **modular** and **extensible**, allowing for easy integration of new features and improvements.
To understand the architecture, we can break it down into several key sub-contexts:

1. **src/app**: This is the main application context where the core logic of Dinhero resides. It includes modules for navigation, react providers, global configurations, theme management, infrastructure typings. This context serves as the backbone of the application, orchestrating various components and services. This context is similar to the "core" infrastructure, handling without a specific domain logic.

2. **src/shared**: This context contains shared utilities, hooks, components, and services that are used across multiple domains. It includes common UI components, helper functions, and shared state management solutions. This context promotes code reuse and consistency throughout the application. Here we have all code that is not domain-specific but is used in multiple places.

3. **src/features**: This is the most complex context and is where the domain-specific logic of Dinhero is implemented. Each feature represents a distinct area of functionality, such as user management, transaction processing, or reporting. The complexity here is because the features are organized into subdirectories, each containing its own "UI", "domain" and "data" layers. This context encapsulates the business logic and rules that govern the application's behavior. In turn, it is separate in multiple directories respecting each sub-category inside features, like the follow example:

- `src/features/ui`:
  - `components/`: Contains reusable UI components specific to the features.
  - `screens/`: Contains screen components that represent different views in the application.
- `src/features/domain`:
  - `models/`: Defines the data models and entities used in the features.
  - `mappers/`: Contains mapping logic between different data representations - other domains or domain to UI.
- `src/features/data`:
  - `repositories/`: Implements data access and storage mechanisms.
  - `services/`: Contains services that interact with external APIs or data sources.
  - `storages/`: Manages local storage and caching mechanisms.
  - `mappers/`: Contains data transformation logic between different layers.