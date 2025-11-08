# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.3.0] - 2025-10-25

### Added
- Image support for portfolio projects with thumbnail display in item lists
- Image display in project detail views with fallback handling
- ImageWithFallback component for robust image loading with error handling
- Comprehensive image debugging and logging for development
- Support for `image_url` field in portfolio items from Supabase

### Changed
- Removed local storage dependency - now uses Supabase exclusively for data
- Removed Edit Content button and admin mode functionality
- Improved image rendering logic with explicit dimensions (64x64px thumbnails)
- Enhanced thumbnail container styling to prevent collapse
- Simplified image display logic with better error handling

### Fixed
- Fixed thumbnail image scaling to properly fit 64x64px containers
- Fixed image visibility issues in portfolio item lists
- Fixed data loading conflicts between Supabase and localStorage
- Removed duplicate Alex Chen profile data from database
- Cleaned up database to ensure only correct portfolio data is displayed

### Technical
- Added comprehensive console logging for image debugging
- Improved image error handling with onError callbacks
- Added visual indicators for image loading states
- Enhanced TypeScript types for image_url support

## [0.2.0] - 2025-10-25

### Added
- Supabase integration for portfolio data management
- Database schema for profiles, sections, and portfolio items
- Portfolio data ingestion from CSV file
- GitHub Pages deployment with GitHub Actions
- Environment variable configuration for Supabase
- Base path configuration for GitHub Pages deployment

### Changed
- Migrated from local storage to Supabase database
- Updated deployment workflow to use GitHub Actions
- Fixed base path configuration for subdirectory deployment

### Fixed
- Fixed 404 errors on deployed GitHub Pages site
- Fixed base path issues causing incorrect asset loading
- Resolved Supabase environment variable errors
- Fixed database schema ordering issues

## [0.1.0] - 2025-10-25

### Added
- Initial portfolio website design implementation
- React TypeScript application structure
- Comprehensive UI components library (shadcn/ui)
- Column-based navigation system
- Portfolio content management system
- Keyboard navigation support
- Accessibility features (ARIA labels, screen reader support)
- Responsive design for desktop and mobile
- Expanded view for detailed project information

### Features
- Three-column layout (sections, items, details)
- Keyboard navigation (arrow keys, Enter, Escape)
- Focus management for accessibility
- Screen reader announcements
- Smooth animations and transitions
- Project filtering by section
- Technology tags display
- External links support

---

[0.3.0]: https://github.com/jdanemane/portfolio/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/jdanemane/portfolio/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/jdanemane/portfolio/releases/tag/v0.1.0