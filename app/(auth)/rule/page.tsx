'use client';
import { FiLock, FiUnlock, FiDollarSign, FiClock, FiCheckCircle, FiArrowUp, FiUsers, FiAward, FiBarChart2 } from 'react-icons/fi';

export default function FinancialRulesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              H5FiveX
            </span> Financial System
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Complete A-Z guide to deposits, withdrawals, and daily tasks
          </p>
        </div>

        {/* Deposit System */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8 border border-gray-200">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
            <div className="flex items-center">
              <FiArrowUp className="text-2xl mr-3" />
              <h2 className="text-2xl font-bold">Deposit System</h2>
            </div>
          </div>
          <div className="p-6 grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-5 rounded-lg border border-blue-100">
              <div className="flex items-center mb-3">
                <FiDollarSign className="text-blue-500 text-xl mr-2" />
                <h3 className="font-bold text-blue-800">Basic Rules</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <FiCheckCircle className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Only USDT (TRC20 network) accepted
                </li>
                <li className="flex items-start">
                  <FiCheckCircle className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Minimum deposit: $30
                </li>
                <li className="flex items-start">
                  <FiCheckCircle className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  No maximum deposit limit
                </li>
              </ul>
            </div>

            <div className="bg-purple-50 p-5 rounded-lg border border-purple-100">
              <div className="flex items-center mb-3">
                <FiLock className="text-purple-500 text-xl mr-2" />
                <h3 className="font-bold text-purple-800">Deposit Lock Period</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="bg-purple-100 text-purple-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    1
                  </div>
                  <p className="text-sm text-gray-700">
                    All deposits are <span className="font-bold">locked for 3 days</span> (72 hours)
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="bg-purple-100 text-purple-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    2
                  </div>
                  <p className="text-sm text-gray-700">
                    During lock period, funds are used to complete marketing tasks
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Withdrawal System */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8 border border-gray-200">
          <div className="bg-gradient-to-r from-green-600 to-teal-500 p-6 text-white">
            <div className="flex items-center">
              <FiArrowUp className="rotate-180 text-2xl mr-3" />
              <h2 className="text-2xl font-bold">Withdrawal System</h2>
            </div>
          </div>
          <div className="p-6 grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 p-5 rounded-lg border border-green-100">
              <div className="flex items-center mb-3">
                <FiCheckCircle className="text-green-600 text-xl mr-2" />
                <h3 className="font-bold text-green-800">Task Requirements</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="bg-green-100 text-green-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    1
                  </div>
                  <p className="text-sm text-gray-700">
                    Must complete <span className="font-bold">3 daily tasks</span> for 3 consecutive days (9 total tasks)
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="bg-green-100 text-green-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    2
                  </div>
                  <p className="text-sm text-gray-700">
                    Tasks include viewing ads, sharing products, and completing surveys
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-teal-50 p-5 rounded-lg border border-teal-100">
              <div className="flex items-center mb-3">
                <FiClock className="text-teal-600 text-xl mr-2" />
                <h3 className="font-bold text-teal-800">Withdrawal Process</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <FiCheckCircle className="text-teal-500 mr-2 mt-0.5 flex-shrink-0" />
                  After completing 9 tasks, withdrawal unlocks
                </li>
                <li className="flex items-start">
                  <FiCheckCircle className="text-teal-500 mr-2 mt-0.5 flex-shrink-0" />
                  Withdraw anytime once unlocked
                </li>
                <li className="flex items-start">
                  <FiCheckCircle className="text-teal-500 mr-2 mt-0.5 flex-shrink-0" />
                  Processed within 24 hours (USDT-TRC20)
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Daily Task System */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-6 text-white">
            <div className="flex items-center">
              <FiCheckCircle className="text-2xl mr-3" />
              <h2 className="text-2xl font-bold">Daily Task System</h2>
            </div>
          </div>
          <div className="p-6">
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              {/* Task 1 */}
              <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
                <div className="flex items-center mb-2">
                  <div className="bg-amber-100 text-amber-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 text-xs font-bold">
                    1
                  </div>
                  <h3 className="font-bold text-amber-800">Ad Viewing</h3>
                </div>
                <p className="text-sm text-gray-700">
                  Watch 3 product advertisements (30 seconds each)
                </p>
              </div>

              {/* Task 2 */}
              <div className="bg-orange-50 p-4 rounded-lg border border-orange-100">
                <div className="flex items-center mb-2">
                  <div className="bg-orange-100 text-orange-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 text-xs font-bold">
                    2
                  </div>
                  <h3 className="font-bold text-orange-800">Product Sharing</h3>
                </div>
                <p className="text-sm text-gray-700">
                  Share product links to 2 social platforms
                </p>
              </div>

              {/* Task 3 */}
              <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                <div className="flex items-center mb-2">
                  <div className="bg-red-100 text-red-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 text-xs font-bold">
                    3
                  </div>
                  <h3 className="font-bold text-red-800">Market Survey</h3>
                </div>
                <p className="text-sm text-gray-700">
                  Complete 1 product satisfaction survey
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-5 rounded-lg border border-blue-100">
              <h3 className="font-bold text-blue-800 mb-3 flex items-center">
                <FiBarChart2 className="mr-2 text-blue-600" />
                Task Completion Benefits
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
                  <div className="text-blue-600 font-bold text-lg mb-1">3 Days</div>
                  <div className="text-xs text-gray-600">Lock period for deposit</div>
                </div>
                <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
                  <div className="text-purple-600 font-bold text-lg mb-1">9 Tasks</div>
                  <div className="text-xs text-gray-600">Required for withdrawal</div>
                </div>
                <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
                  <div className="text-green-600 font-bold text-lg mb-1">Unlock</div>
                  <div className="text-xs text-gray-600">Withdraw anytime after completion</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* VIP System Summary */}
        <div className="mt-8 bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <FiAward className="mr-3 text-purple-500" />
            VIP Tier Requirements
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100 text-gray-700 text-sm">
                  <th className="p-3 text-left rounded-tl-lg">VIP Level</th>
                  <th className="p-3 text-left">Requirements</th>
                  <th className="p-3 text-left rounded-tr-lg">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="p-3 font-medium">VIP 1</td>
                  <td className="p-3 text-sm text-gray-600">Automatic for all users</td>
                  <td className="p-3">
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center w-fit">
                      <FiUnlock className="mr-1" /> Unlocked
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">VIP 2</td>
                  <td className="p-3 text-sm text-gray-600">5 members with $100+ deposits</td>
                  <td className="p-3">
                    <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full flex items-center w-fit">
                      <FiLock className="mr-1" /> Locked
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">VIP 3</td>
                  <td className="p-3 text-sm text-gray-600">10 members with $100+ deposits</td>
                  <td className="p-3">
                    <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full flex items-center w-fit">
                      <FiLock className="mr-1" /> Locked
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">VIP 4</td>
                  <td className="p-3 text-sm text-gray-600">20 members with $100+ deposits</td>
                  <td className="p-3">
                    <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full flex items-center w-fit">
                      <FiLock className="mr-1" /> Locked
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">VIP 5</td>
                  <td className="p-3 text-sm text-gray-600">30 members with $100+ deposits</td>
                  <td className="p-3">
                    <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full flex items-center w-fit">
                      <FiLock className="mr-1" /> Locked
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="p-3 font-medium rounded-bl-lg">VIP 6</td>
                  <td className="p-3 text-sm text-gray-600">40 members with $100+ deposits</td>
                  <td className="p-3 rounded-br-lg">
                    <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full flex items-center w-fit">
                      <FiLock className="mr-1" /> Locked
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}