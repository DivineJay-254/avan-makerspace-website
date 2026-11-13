export type AvanTechProject = {
  slug: string
  title: string
  category: string
  description: string
  image: string
  alt: string
  overview: string
  opportunity: string
  build: string
  technologies: string[]
  learning: string
  status: string
}

export const avantechProjects: AvanTechProject[] = [
  {
    slug: 'smart-homes',
    title: 'Smart Homes',
    category: 'Robotics, Electronics and Home Automation',
    description: 'Our students explored smart home technology by developing automation concepts that demonstrate how everyday household systems can become more intelligent, convenient and responsive.',
    image: '/avantech-smart-homes.png',
    alt: 'Illustrative student-built miniature smart home with visible LEDs and electronics on a workbench',
    overview: 'A hands-on exploration of how simple electronic systems can make household functions more responsive.',
    opportunity: 'Everyday household tasks offer opportunities to explore electronic control, sensors and thoughtful automation.',
    build: 'Students developed smart-home automation concepts using a miniature model and accessible electronic components.',
    technologies: ['Electronic control systems', 'Sensors and input devices where applicable', 'Smart switching and device control', 'Home automation concepts'],
    learning: 'The project introduces how inputs, control systems and outputs can work together in an automated environment.',
    status: 'Student exploration and prototype development',
  },
  {
    slug: 'automatic-doors',
    title: 'Automatic Doors',
    category: 'Automation and Embedded Systems',
    description: 'Our students experimented with automatic door systems, exploring how electronic components and control mechanisms can be used to automate everyday movement and access systems.',
    image: '/avantech-automatic-doors.png',
    alt: 'Illustrative miniature sliding door engineering prototype with visible motor and sensor components',
    overview: 'A miniature door system that helps students explore mechanisms and electronic control.',
    opportunity: 'Movement through a doorway is a familiar interaction that can be explored through practical automation.',
    build: 'Students experimented with a small door mechanism, electronic controls and detection concepts.',
    technologies: ['Automated opening and closing', 'Sensor-based detection where implemented', 'Motor or servo mechanisms where applicable', 'Electronic control'],
    learning: 'Students explore how mechanical movement and electronic control can work together in a practical system.',
    status: 'Student experimentation; component details remain editable as the project develops',
  },
  {
    slug: 'voice-command-cars',
    title: 'Voice Command Cars',
    category: 'Robotics and Voice-Controlled Systems',
    description: 'Our students explored the interaction between voice commands and robotics by developing vehicles that respond to spoken instructions.',
    image: '/avantech-voice-cars.png',
    alt: 'Illustrative educational robotic car on an exposed chassis with wheels and electronics',
    overview: 'A robotics exploration into how spoken instructions can interact with a mobile vehicle.',
    opportunity: 'Voice interaction offers a way to examine how people communicate instructions to machines.',
    build: 'Students explored a robotic vehicle concept that responds to spoken instructions and controls its movement.',
    technologies: ['Voice-command interaction', 'Vehicle movement and direction control', 'Embedded electronics', 'Human-machine interaction'],
    learning: 'The project introduces the relationship between commands, control systems and robot movement.',
    status: 'Student experimentation; specific components and implementation details are not yet documented',
  },
  {
    slug: 'remote-control-rovers',
    title: 'Remote Control Rovers',
    category: 'Robotics and Wireless Control',
    description: 'Our students worked on remotely controlled robotic rovers, exploring how wireless communication and electronic control systems can be used to operate mobile robotic platforms.',
    image: '/avantech-rovers.png',
    alt: 'Illustrative four-wheel student rover prototype with visible motors and an electronics platform',
    overview: 'A mobile robotics project exploring wireless operation and control.',
    opportunity: 'Remote operation is a practical way to explore how wireless communication connects people with machines.',
    build: 'Students worked on a rover platform and explored movement through remote electronic control.',
    technologies: ['Remote movement and navigation', 'Wireless control', 'Motor control', 'Robotic chassis development'],
    learning: 'Students explore how chassis design, motors and wireless control contribute to a mobile robot.',
    status: 'Student project and practical experimentation',
  },
  {
    slug: 'firefighting-rovers',
    title: 'Firefighting Rovers',
    category: 'Robotics and Applied Problem-Solving',
    description: 'Our students explored the concept of robotic firefighting systems by developing rover-based ideas designed to demonstrate how robots could assist in situations involving fire and hazardous environments.',
    image: '/avantech-firefighting-rover.png',
    alt: 'Illustrative student firefighting rover concept with a small water-spraying attachment',
    overview: 'A concept project exploring how mobile robots might assist in safety-related situations.',
    opportunity: 'Engineering can help people think about safer ways to approach hazardous environments.',
    build: 'Students explored a rover concept with a small water-spraying mechanism as an educational demonstration.',
    technologies: ['Mobile robotic platforms', 'Remote operation concepts', 'Safety-focused problem-solving', 'Exploration of a water-spraying mechanism'],
    learning: 'The project encourages practical problem-solving and careful discussion of robotics for safety applications.',
    status: 'Educational concept only; not a certified device and not represented as tested in emergencies',
  },
]

export const aquaSmart = {
  title: 'AquaSmart',
  image: '/aquasmart-concept.png',
  alt: 'Illustrative modular water-treatment concept with filter housings, tubing, sample bottles and a solar panel',
  description: 'AquaSmart is an ongoing innovation initiative exploring modular water-treatment technology designed to adapt to different water sources and address water-quality challenges in underserved communities.',
  areas: [
    { title: 'Modular Water Treatment', description: 'Exploring adaptable treatment configurations for different water sources.' },
    { title: 'Physical Filtration Prototype', description: 'A physical water filtration prototype has already been developed.' },
    { title: 'Solar and Battery Power', description: 'Exploring solar and battery-powered operation for places with limited electricity access.' },
    { title: 'Arduino-Based Monitoring', description: 'Exploring affordable electronics and Arduino integration for monitoring and automation as the project develops.' },
    { title: 'Water Quality Testing', description: 'Developing a pathway for testing different water sources and evaluating treatment performance.' },
  ],
  timeline: [
    { title: 'Problem Identification', description: 'Understanding water challenges in Kakuma.' },
    { title: 'Research and Design', description: 'Exploring modular water-treatment approaches.' },
    { title: 'Prototype Development', description: 'Building the physical filtration prototype.' },
    { title: 'System Integration', description: 'Exploring solar power, battery systems and electronic monitoring.' },
    { title: 'Testing and Validation', description: 'Evaluating water quality and system performance.' },
    { title: 'Future Development', description: 'Improving the platform and exploring wider applications.' },
  ],
}
