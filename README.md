## Architecture

### Data Management
- **Home Page**: Static featured reviews (hardcoded for performance)
- **Reviews Page**: Dynamic reviews loaded via Mock API
  - Demonstrates async data fetching
  - Includes filtering, sorting, pagination UI
  - Can be easily replaced with real backend


## Technical Decisions

### State Management
- Custom cart system using Context + useReducer pattern
- Form validation with debounced async checks
- localStorage persistence with lazy initialization

### Why external libraries were used:
- react-hot-toast: Industry-standard notification system. 
  Focused development on core business logic instead of 
  reinventing UI primitives.
- lucide-react: Modern icon library, better than creating 
  SVG components manually.