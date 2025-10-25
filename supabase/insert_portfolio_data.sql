-- Portfolio Data Insertion Script
-- This script inserts portfolio data from Justin's Portfolio - Works.csv

-- First, create a profile
INSERT INTO profiles (id, name, tagline) VALUES 
('550e8400-e29b-41d4-a716-446655440000', 'Justin Daneman', 'UX Designer & Product Lead')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  tagline = EXCLUDED.tagline;

-- Create sections for different types of work
INSERT INTO sections (id, profile_id, title, order_index) VALUES 
('550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440000', 'UX Design Projects', 1),
('550e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440000', 'Data Design Projects', 2),
('550e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440000', 'Product Leadership', 3)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  order_index = EXCLUDED.order_index;

-- Insert portfolio items from the CSV data
INSERT INTO portfolio_items (id, section_id, title, type, year, company, description, details, url, tech, order_index) VALUES 

-- UX Design Projects
('550e8400-e29b-41d4-a716-446655440010', '550e8400-e29b-41d4-a716-446655440001', 'Min første rejse', 'project', '2023', 'DSB Digital Labs', 'A child-centric mobile app designed to simplify and foster independent use of public transportation for kids', '<h3>Project Overview</h3><p><strong>Objective</strong>: The project aimed to design a mobile application that empowers children aged 6-12 to navigate public transportation systems independently while providing peace of mind to their parents. The app, named "DSBeta," integrates train, bus, and walking routes into a single platform with real-time updates and safety features tailored for young users.</p><p><strong>Challenge</strong>: Public transport can be complex and intimidating, especially for young children traveling alone for the first time. Our challenge was to create an intuitive user experience that simplifies this complexity into a friendly and engaging interface.</p><p><strong>Solution Preview</strong>: Through extensive research, iterative design processes, and user testing with our target demographic, we developed Min første rejse– an app that combines playful interactions with clear visual guidance systems.</p>', 'https://www.dsbeta.dk', ARRAY['UX Design', 'UX Research', 'DesignOps', 'Product Lead'], 1),

('550e8400-e29b-41d4-a716-446655440011', '550e8400-e29b-41d4-a716-446655440001', 'BioDive', 'project', '2022', 'DSB Digital Labs', 'Building the new Bio Link and testing through low code', 'UX design and research project focused on creating intuitive bio link solutions.', '', ARRAY['UX Design', 'UX Research', 'DesignOps'], 2),

('550e8400-e29b-41d4-a716-446655440012', '550e8400-e29b-41d4-a716-446655440001', 'Bio Links', 'project', '2020', 'Linkfire', 'Building the new Bio Link and testing through low code', 'Development of bio link functionality with comprehensive testing.', '', ARRAY['UX Design', 'UX Research'], 3),

('550e8400-e29b-41d4-a716-446655440013', '550e8400-e29b-41d4-a716-446655440001', 'Street Yoga', 'project', '2018', '', 'UX design project for yoga community platform', 'Designing user experiences for street yoga community engagement.', '', ARRAY['UX Design', 'UX Research', 'IX Design', 'UI Design'], 4),

('550e8400-e29b-41d4-a716-446655440014', '550e8400-e29b-41d4-a716-446655440001', 'Your Local', 'project', '2016', '', 'React needed help with typography', 'Typography and design system work for local community platform.', 'https://webflow.com/templates/designers/flowsuit', ARRAY['UX Design', 'UX Research'], 5),

-- Data Design Projects
('550e8400-e29b-41d4-a716-446655440020', '550e8400-e29b-41d4-a716-446655440002', 'Kørmit', 'project', '2020', 'DSB Digital Labs', 'Data design and UX research project', 'Comprehensive data visualization and user experience design for transportation systems.', '', ARRAY['Data Design', 'UX Design', 'UX Research'], 1),

('550e8400-e29b-41d4-a716-446655440021', '550e8400-e29b-41d4-a716-446655440002', 'Copenhagen Air', 'project', '2015', '', 'Data visualization project', 'Creating meaningful data representations for air quality and environmental information.', 'https://webflow.com/templates/designers/flowsuit', ARRAY['Data Design'], 2),

-- Other Projects
('550e8400-e29b-41d4-a716-446655440030', '550e8400-e29b-41d4-a716-446655440001', 'Colorwise', 'project', '2021', 'ITU', 'Vision needed help with Illustration', 'Illustration and visual design project for color management system.', 'https://webflow.com/templates/designers/flowsuit', ARRAY['VFX'], 6)

ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  type = EXCLUDED.type,
  year = EXCLUDED.year,
  company = EXCLUDED.company,
  description = EXCLUDED.description,
  details = EXCLUDED.details,
  url = EXCLUDED.url,
  tech = EXCLUDED.tech,
  order_index = EXCLUDED.order_index;

-- Verify the data was inserted
SELECT 
  p.name as profile_name,
  s.title as section_title,
  COUNT(pi.id) as item_count
FROM profiles p
JOIN sections s ON s.profile_id = p.id
LEFT JOIN portfolio_items pi ON pi.section_id = s.id
GROUP BY p.name, s.title, s.order_index
ORDER BY s.order_index;
