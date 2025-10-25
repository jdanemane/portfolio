# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.0] - 2024-12-19

### Added
- Complete Supabase CMS integration for portfolio content management
- Enhanced ColumnNavigation component with improved functionality
- Database schema updates for CMS operations
- Environment file handling with proper .gitignore configuration

### Changed
- Updated Supabase setup documentation for better clarity
- Improved database schema structure for CMS functionality
- Enhanced component architecture for better maintainability

### Technical Details
- **Database**: Updated schema with proper CMS table structures
- **Components**: Enhanced ColumnNavigation with new features
- **Documentation**: Improved setup guides and configuration instructions
- **Version**: Bumped from 0.1.0 to 0.2.0

### Migration Notes
- This release introduces Supabase as the backend CMS
- Environment variables need to be configured for Supabase connection
- Database schema changes require migration (see SUPABASE_SETUP.md)

## [0.1.0] - 2024-12-19

### Added
- Initial portfolio website design
- Basic React + Vite setup
- Radix UI component library integration
- Minimal portfolio layout and structure
- Initial project configuration and dependencies

### Technical Details
- **Framework**: React 18.3.1 with Vite 6.3.5
- **UI Library**: Radix UI components with Tailwind CSS
- **Build System**: Vite with SWC for fast compilation
- **TypeScript**: Full TypeScript support with proper type definitions
