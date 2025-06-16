'use client';

import React, { useState } from 'react';
import { 
  FiHelpCircle, FiMail, FiPhone, FiMessageSquare, 
  FiClock, FiUser, FiDollarSign, FiLock,
  FiDownload, FiSmartphone, FiCreditCard,FiAward,
  FiAlertCircle, FiCheckCircle, FiArrowRight
} from 'react-icons/fi';

const HelpPage = () => {
  const [activeCategory, setActiveCategory] = useState('account');
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);

  const categories = [
    {
      id: 'account',
      name: 'Account',
      icon: <FiUser className="text-blue-500" />
    },
    {
      id: 'deposits',
      name: 'Deposits',
      icon: <FiDollarSign className="text-green-500" />
    },
    {
      id: 'withdrawals',
      name: 'Withdrawals',
      icon: <FiCreditCard className="text-purple-500" />
    },
    {
      id: 'tasks',
      name: 'Daily Tasks',
      icon: <FiCheckCircle className="text-amber-500" />
    },
    {
      id: 'vip',
      name: 'VIP System',
      icon: <FiAward className="text-red-500" />
    },
    {
      id: 'technical',
      name: 'Technical',
      icon: <FiSmartphone className="text-indigo-500" />
    }
  ];

  const faqs = {
    account: [
      {
        question: 'How do I create an account?',
        answer: 'Click "Register" on our homepage, fill in your details, verify your email, and complete your profile setup.'
      },
      {
        question: 'Why is my account under review?',
        answer: 'New accounts undergo a 24-hour verification process for security. You\'ll receive email confirmation when approved.'
      },
      {
        question: 'How to change my password?',
        answer: 'Go to Profile > Security > Change Password. You\'ll need your current password to set a new one.'
      }
    ],
    deposits: [
      {
        question: 'What payment methods can I use?',
        answer: 'We accept USDT (TRC20/ERC20), bank transfers, and major credit cards. Minimum deposit is $10.'
      },
      {
        question: 'Why are deposits locked for 72 hours?',
        answer: 'This security period prevents fraudulent activity and ensures transaction compliance with financial regulations.'
      },
      {
        question: 'My deposit hasn\'t appeared in my balance',
        answer: 'Crypto deposits may take 10-30 minutes. If longer, check the transaction hash or contact support with proof.'
      }
    ],
    withdrawals: [
      {
        question: 'Why do I need to complete 9 tasks?',
        answer: 'This ensures active participation in our marketing ecosystem before withdrawing earnings.'
      },
      {
        question: 'How long do withdrawals take?',
        answer: 'Processed within 24-48 hours after request. VIP members get priority processing.'
      },
      {
        question: 'Why was my withdrawal rejected?',
        answer: 'Common reasons: incomplete tasks, unverified identity, or suspicious activity. Check your email for details.'
      }
    ],
    tasks: [
      {
        question: 'What are the daily tasks?',
        answer: 'Tasks include product reviews (1-2 min), social shares, and surveys. 3 tasks/day maintains active status.'
      },
      {
        question: 'What if I miss a day?',
        answer: 'You can make up missed tasks within 7 days without penalty. After that, earnings may be paused.'
      },
      {
        question: 'How do tasks affect my earnings?',
        answer: 'Completed tasks boost your earning rate. 9 completed tasks unlock withdrawal capability.'
      }
    ],
    vip: [
      {
        question: 'How does VIP progression work?',
        answer: 'Upgrade by referring members who deposit $100+: VIP2 (5), VIP3 (10), VIP4 (20), VIP5 (30), VIP6 (40).'
      },
      {
        question: 'What are VIP benefits?',
        answer: 'Higher earnings (20-100%), exclusive products, priority support, and special bonuses at each level.'
      },
      {
        question: 'How often is VIP status updated?',
        answer: 'Team qualifications are verified daily at midnight UTC. Status upgrades apply immediately.'
      }
    ],
    technical: [
      {
        question: 'The app won\'t load properly',
        answer: 'Try: 1) Force close and reopen 2) Clear cache 3) Update to latest version 4) Reinstall if needed.'
      },
      {
        question: 'I can\'t receive SMS verification',
        answer: 'Check spam folder, ensure correct phone number, or request voice verification instead.'
      },
      {
        question: 'How to secure my account?',
        answer: 'Enable 2FA, never share login details, use strong passwords, and verify all withdrawal emails.'
      }
    ]
  };

  const supportChannels = [
    {
      name: 'Email Support',
      description: 'For detailed inquiries and documentation',
      icon: <FiMail className="text-blue-500" />,
      contact: 'support@h5fivex.com',
      response: 'Within 12 hours'
    },
    {
      name: 'Live Chat',
      description: 'Instant help during business hours',
      icon: <FiMessageSquare className="text-green-500" />,
      contact: 'Open chat in app',
      response: '2-15 minutes'
    },
   
  ];

  const quickGuides = [
    {
      title: 'First Deposit Guide',
      steps: [
        'Navigate to Wallet > Deposit',
        'Select payment method',
        'Enter amount ($10 minimum)',
        'Complete payment verification'
      ],
      icon: <FiDollarSign className="text-blue-500" />
    },
    {
      title: 'Complete Daily Tasks',
      steps: [
        'Go to Tasks tab by 9AM',
        'Complete all 3 marked activities',
        'Submit required proofs',
        'Track progress in Dashboard'
      ],
      icon: <FiCheckCircle className="text-green-500" />
    },
    {
      title: 'Withdraw Earnings',
      steps: [
        'Ensure 9+ completed tasks',
        'Go to Wallet > Withdraw',
        'Enter amount ($20 minimum)',
        'Confirm via email/SMS'
      ],
      icon: <FiCreditCard className="text-purple-500" />
    }
  ];

  const toggleQuestion = (index: number) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3 flex items-center justify-center">
            <FiHelpCircle className="mr-3 text-blue-500" />
            H5Fivex Help Center
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Find answers, guides, and contact options for your H5Fivex experience
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-8 border border-gray-200">
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Search help articles (e.g. 'deposit problems')"
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
            <FiHelpCircle className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* FAQ Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-800 flex items-center">
                  <FiHelpCircle className="mr-2 text-blue-500" />
                  Frequently Asked Questions
                </h2>
              </div>
              
              {/* Category Tabs */}
              <div className="border-b border-gray-200 overflow-x-auto">
                <div className="flex px-4">
                  {categories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`flex items-center px-4 py-3 border-b-2 font-medium text-sm ${activeCategory === category.id ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                    >
                      <span className="mr-2">{category.icon}</span>
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Questions */}
              <div className="divide-y divide-gray-200">
                {faqs[activeCategory as keyof typeof faqs].map((faq, index) => (
                  <div key={index} className="p-6">
                    <button
                      onClick={() => toggleQuestion(index)}
                      className="flex justify-between items-center w-full text-left"
                    >
                      <h3 className="font-medium text-gray-800">{faq.question}</h3>
                      <FiArrowRight className={`ml-4 transform transition ${openQuestion === index ? 'rotate-90 text-blue-500' : 'text-gray-400'}`} />
                    </button>
                    {openQuestion === index && (
                      <div className="mt-3 text-gray-600 pl-2">
                        <p>{faq.answer}</p>
                        {index === 0 && activeCategory === 'account' && (
                          <button className="mt-3 text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center">
                            Watch account setup video <FiArrowRight className="ml-1" />
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Support Channels */}
          <div>
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 mb-6">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-800 flex items-center">
                  <FiMessageSquare className="mr-2 text-blue-500" />
                  Contact Support
                </h2>
              </div>
              <div className="divide-y divide-gray-200">
                {supportChannels.map((channel, index) => (
                  <div key={index} className="p-6">
                    <div className="flex items-start">
                      <div className="p-2 rounded-lg bg-gray-50 mr-4">
                        {channel.icon}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800">{channel.name}</h3>
                        <p className="text-sm text-gray-500 mb-2">{channel.description}</p>
                        <div className="flex items-center text-sm">
                          <span className="font-medium text-gray-700 mr-3">{channel.contact}</span>
                          <span className="flex items-center text-xs bg-gray-100 px-2 py-1 rounded">
                            <FiClock className="mr-1 text-gray-500" />
                            {channel.response}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Guides */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-800 flex items-center">
                  <FiCheckCircle className="mr-2 text-blue-500" />
                  Quick Guides
                </h2>
              </div>
              <div className="divide-y divide-gray-200">
                {quickGuides.map((guide, index) => (
                  <div key={index} className="p-6">
                    <div className="flex items-start mb-3">
                      <div className="p-2 rounded-lg bg-gray-50 mr-4">
                        {guide.icon}
                      </div>
                      <h3 className="font-medium text-gray-800">{guide.title}</h3>
                    </div>
                    <ol className="list-decimal list-inside text-sm text-gray-600 space-y-1.5 pl-10">
                      {guide.steps.map((step, i) => (
                        <li key={i}>{step}</li>
                      ))}
                    </ol>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Notice */}
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8">
          <div className="flex items-start">
            <FiAlertCircle className="text-red-500 text-xl mr-3 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-red-800 mb-2">Urgent Security Notice</h3>
              <p className="text-red-700">
                Never share your password or 2FA codes. H5Fivex staff will <strong>never</strong> ask for this information. 
                If contacted by someone claiming to be support, immediately email <span className="font-medium">security@h5fivex.com</span>
              </p>
            </div>
          </div>
        </div>

        {/* System Status */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="p-2 rounded-full bg-green-100 mr-4">
                <FiCheckCircle className="text-green-500" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800">All Systems Operational</h3>
                <p className="text-sm text-gray-500">Last updated: {new Date().toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;