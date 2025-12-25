interface Module {
  name: string
  focus: string
}

interface AgeGroupSectionProps {
  id: string
  title: string
  ageRange: string
  coreAim: string
  coreOutcomes: string[]
  learningAreas: string[]
  modules: Module[]
  measurableSkills: string[]
  endGoal: string
  color: 'blue' | 'green' | 'purple' | 'orange'
}

const colorClasses = {
  blue: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    accent: 'bg-blue-500',
    text: 'text-blue-700',
    button: 'bg-blue-600 hover:bg-blue-700',
  },
  green: {
    bg: 'bg-green-50',
    border: 'border-green-200',
    accent: 'bg-green-500',
    text: 'text-green-700',
    button: 'bg-green-600 hover:bg-green-700',
  },
  purple: {
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    accent: 'bg-purple-500',
    text: 'text-purple-700',
    button: 'bg-purple-600 hover:bg-purple-700',
  },
  orange: {
    bg: 'bg-orange-50',
    border: 'border-orange-200',
    accent: 'bg-orange-500',
    text: 'text-orange-700',
    button: 'bg-orange-600 hover:bg-orange-700',
  },
}

export default function AgeGroupSection({
  id,
  title,
  ageRange,
  coreAim,
  coreOutcomes,
  learningAreas,
  modules,
  measurableSkills,
  endGoal,
  color,
}: AgeGroupSectionProps) {
  const colors = colorClasses[color]

  return (
    <section id={id} className={`${colors.bg} py-20 scroll-mt-20`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 rounded-full bg-white mb-4 shadow-sm">
            <span className={`text-sm font-semibold ${colors.text} uppercase tracking-wide`}>
              {ageRange}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            {title}
          </h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-xl text-gray-700 leading-relaxed">
              <span className="font-semibold text-primary">Core Aim:</span>{' '}
              {coreAim}
            </p>
          </div>
        </div>

        {/* End Goal */}
        <div className={`${colors.border} border-l-4 bg-white p-6 rounded-r-lg mb-12 shadow-sm`}>
          <h3 className="text-lg font-semibold text-primary mb-2">End Goal</h3>
          <p className="text-gray-700">{endGoal}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Core Outcomes */}
          <div className="bg-white p-8 rounded-xl shadow-sm">
            <div className="flex items-center mb-6">
              <div className={`w-1 h-8 ${colors.accent} rounded-full mr-4`}></div>
              <h3 className="text-2xl font-bold text-primary">Core Outcomes</h3>
            </div>
            <ul className="space-y-3">
              {coreOutcomes.map((outcome, index) => (
                <li key={index} className="flex items-start">
                  <svg
                    className={`w-5 h-5 ${colors.text} mr-3 mt-0.5 flex-shrink-0`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-700">{outcome}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Learning Areas */}
          <div className="bg-white p-8 rounded-xl shadow-sm">
            <div className="flex items-center mb-6">
              <div className={`w-1 h-8 ${colors.accent} rounded-full mr-4`}></div>
              <h3 className="text-2xl font-bold text-primary">Learning Areas</h3>
            </div>
            <ul className="space-y-3">
              {learningAreas.map((area, index) => (
                <li key={index} className="flex items-start">
                  <svg
                    className={`w-5 h-5 ${colors.text} mr-3 mt-0.5 flex-shrink-0`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-700">{area}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Program Modules */}
        <div className="bg-white p-8 rounded-xl shadow-sm mb-12">
          <div className="flex items-center mb-6">
            <div className={`w-1 h-8 ${colors.accent} rounded-full mr-4`}></div>
            <h3 className="text-2xl font-bold text-primary">Program Modules</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 px-4 font-semibold text-primary">Module</th>
                  <th className="text-left py-4 px-4 font-semibold text-primary">Focus</th>
                </tr>
              </thead>
              <tbody>
                {modules.map((module, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-4 px-4 font-medium text-gray-900">{module.name}</td>
                    <td className="py-4 px-4 text-gray-700">{module.focus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Measurable Skills */}
        <div className="bg-white p-8 rounded-xl shadow-sm">
          <div className="flex items-center mb-6">
            <div className={`w-1 h-8 ${colors.accent} rounded-full mr-4`}></div>
            <h3 className="text-2xl font-bold text-primary">Measurable Skills (Indicators)</h3>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {measurableSkills.map((skill, index) => (
              <div
                key={index}
                className={`flex items-start p-4 rounded-lg ${colors.bg} border ${colors.border}`}
              >
                <svg
                  className={`w-5 h-5 ${colors.text} mr-3 mt-0.5 flex-shrink-0`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-gray-700">{skill}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

