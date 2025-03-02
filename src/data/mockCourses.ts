// src/data/mockCourses.ts
export const MOCK_COURSES = [
  {
    id: '1',
    title: 'Python Fundamentals',
    description: 'Learn fundamentals python such as functions, looping, types.',
    studentCount: 1000,
    sectionCount: 3,
    imageUrl: require('../assets/python-icon.png'),
    sections: [
      {
        id: 's1',
        title: 'Basic Procedure',
        subsections: [
          { id: 'ss1', title: 'Concept', duration: 5 },
          { id: 'ss2', title: 'Practice', questionCount: 4 }
        ]
      },
      // Add more sections as needed
    ]
  },
  {
    id: '2',
    title: 'Web Development with React',
    description: 'Web development using React',
    studentCount: 200,
    sectionCount: 5,
    imageUrl: require('../assets/react.jpg'),
    sections: []
  },
  {
    id: '3',
    title: 'Object-oriented Programming',
    description: 'Current industry standard is using java language, learn about inheritance, class, object, etc.',
    studentCount: 350,
    sectionCount: 10,
    imageUrl: require('../assets/java.jpg'),
    sections: []
  }
];