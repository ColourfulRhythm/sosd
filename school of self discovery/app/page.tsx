import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import AgeGroupSection from '@/components/AgeGroupSection'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              AIMS & OBJECTIVES
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Complete Development – Result-Driven Structure
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-primary to-primary-dark text-white p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold mb-4">Our Approach</h3>
              <p className="text-white/90 leading-relaxed">
                Each category includes Core Outcomes, Key Learning Areas, Program Modules, 
                and Measurable Skills that learners must demonstrate.
              </p>
            </div>
            <div className="bg-accent/10 border-2 border-accent p-8 rounded-xl">
              <h3 className="text-2xl font-bold text-primary mb-4">Result-Driven</h3>
              <p className="text-gray-700 leading-relaxed">
                We focus on measurable indicators and end-results, ensuring every participant 
                develops tangible skills and personal growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Children Section */}
      <AgeGroupSection
        id="children"
        title="CHILDREN"
        ageRange="Ages 6–12"
        coreAim="Introduce self-identity, responsibility, confidence, and early moral awareness in simple, engaging ways."
        endGoal="Children develop confidence, responsibility, healthy curiosity, and awareness of personal uniqueness."
        coreOutcomes={[
          'Stable sense of identity and confidence in expression',
          'Ability to recognise feelings and act calmly',
          'Strong habit foundation—orderliness, honesty, duty',
          'Improved communication and self-expression',
        ]}
        learningAreas={[
          'Who am I? (Discovering uniqueness)',
          'Feelings & Choices (Emotional awareness)',
          'Responsibility & Tasks',
          'Creativity + Problem Solving',
        ]}
        modules={[
          { name: 'My Identity', focus: 'Who I am, what makes me special' },
          { name: 'My Feelings & My Actions', focus: 'Naming emotions, calm reactions' },
          { name: 'I Can Learn & Grow', focus: 'Confidence, trying again after mistakes' },
          { name: 'My Little Responsibilities', focus: 'Chores, class tasks, diligence' },
          { name: 'Think, Create, Build', focus: 'Games for problem-solving' },
        ]}
        measurableSkills={[
          'Can identify personal strengths',
          'Completes simple assigned tasks independently',
          'Communicates feelings using words, not tantrums',
          'Shows confidence when answering or presenting',
        ]}
        color="blue"
      />

      {/* Teens Section */}
      <AgeGroupSection
        id="teens"
        title="TEENS"
        ageRange="Ages 13–17"
        coreAim="Guide them in identity formation, resilience, values, discipline, and goal-setting during a highly impressionable stage."
        endGoal="Teens gain clarity of identity, goal-direction, discipline, and inner strength to resist pressure."
        coreOutcomes={[
          'Defined personal values and identity',
          'Self-regulation and resilience under pressure',
          'Goal-setting habit & future orientation',
          'Reduction of comparison, fear & insecurity',
        ]}
        learningAreas={[
          'Identity vs Peer Pressure',
          'Goal Setting + Execution',
          'Discipline & Emotional Control',
          'Career Exposure + Interests',
        ]}
        modules={[
          { name: 'Who I Am vs Who Others Expect Me To Be', focus: 'Authenticity' },
          { name: 'Choices & Consequences', focus: 'Moral strength' },
          { name: 'Vision Board / Life Goals', focus: 'Future clarity' },
          { name: 'Discipline + Habits', focus: 'Study, time management' },
          { name: 'Talent & Career Discovery Lab', focus: 'Exposure to skills & industries' },
        ]}
        measurableSkills={[
          'Produces a personal vision/goal plan',
          'Reduced impulsive reactions & improved decision logic',
          'Demonstrates responsibility with school/task deadlines',
          'Shows leadership confidence in group activities',
        ]}
        color="green"
      />

      {/* Young Adults Section */}
      <AgeGroupSection
        id="young-adults"
        title="YOUNG ADULTS"
        ageRange="Ages 18–25"
        coreAim="Aid transition into independence—clarity of purpose, career direction, discipline, and relationship maturity."
        endGoal="Participants gain direction, purpose, financial responsibility, relational maturity, and career focus."
        coreOutcomes={[
          'Clarity of life purpose and calling',
          'Defined career or vocation pathway',
          'Strong financial literacy and work ethic',
          'Mature relationship judgment and responsibility',
        ]}
        learningAreas={[
          'Purpose & Life Assignment Discovery',
          'Career/Business Skills + Productivity Systems',
          'Financial Discipline',
          'Relationships, Boundaries, Maturity',
        ]}
        modules={[
          { name: 'Identity & Purpose Mapping', focus: 'Gifts, calling, assignments' },
          { name: 'Career Activation Suite', focus: 'CV, skills, internships' },
          { name: 'Money & Future', focus: 'Savings, investment basics' },
          { name: 'Leadership & Influence', focus: 'Public speaking, team work' },
          { name: 'Relationship Intelligence', focus: 'Boundaries, self-worth, partner choice' },
        ]}
        measurableSkills={[
          'Produces a personal purpose statement',
          'Creates a skill-development or career road-map',
          'Manages personal spending/saving with discipline',
          'Resolved conflicts respectfully and matured socially',
        ]}
        color="purple"
      />

      {/* Adults Section */}
      <AgeGroupSection
        id="adults"
        title="ADULTS"
        ageRange="Ages 26+"
        coreAim="Enable self-mastery, clarity, productivity, and fulfillment beyond routine living."
        endGoal="Adults achieve self-mastery, productivity, emotional balance, and purposeful living beyond survival."
        coreOutcomes={[
          'Clear direction for life, family, work, calling',
          'Improved productivity, time management, habit strength',
          'Emotional stability and relational intelligence',
          'Holistic growth—faith, finances, leadership, legacy',
        ]}
        learningAreas={[
          'Purpose Refinement & Legacy Building',
          'Focus, Discipline, and Productivity Routines',
          'Emotional Mastery & Peaceful Living',
          'Financial Responsibility & Investment',
        ]}
        modules={[
          { name: 'Life Purpose Reset', focus: 'Re-alignment for impact' },
          { name: 'Mastery Systems', focus: 'Time, productivity, routines' },
          { name: 'Emotional Intelligence', focus: 'Self-awareness, handling offense' },
          { name: 'Wealth & Responsibility', focus: 'Budgeting, risk, planning' },
          { name: 'Legacy Thinking', focus: 'Mentorship, long-term influence' },
        ]}
        measurableSkills={[
          'Writes a refined life roadmap with timelines',
          'Reduces procrastination consistently',
          'Demonstrates emotional control in conflict',
          'Begins long-term skill/financial growth planning',
        ]}
        color="orange"
      />

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-primary to-primary-dark text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Start Your Journey Today</h2>
          <p className="text-xl text-white/90 mb-8">
            Ready to unlock your inner possibilities? Get in touch with us to learn more about our programs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:info@schoolofselfdiscovery.com"
              className="bg-accent text-primary-dark px-8 py-4 rounded-lg font-semibold text-lg hover:bg-accent-light transition-all transform hover:scale-105 shadow-xl"
            >
              Contact Us
            </a>
            <a
              href="#children"
              className="bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/20 transition-all"
            >
              Explore Programs
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary-dark text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-white/80 mb-4">
              © {new Date().getFullYear()} School of Self-Discovery. All rights reserved.
            </p>
            <p className="text-white/60 text-sm">
              Unlock Your Inner Possibilities
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}


