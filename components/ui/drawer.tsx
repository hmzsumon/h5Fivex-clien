'use client';

import React from 'react';
import { 
  FiAward,
  FiUsers,
  FiDollarSign,
  FiStar,
  FiCheckCircle,
  FiGift,
  FiTrendingUp,
  FiUserCheck,
  FiBarChart2,
  FiCalendar
} from 'react-icons/fi';
import { motion } from 'framer-motion';

interface RewardTier {
  id: number;
  title: string;
  target: string;
  reward: string;
  bonus: string;
  progress: number;
  completed: boolean;
  icon: React.ReactNode;
  color: string;
  monthlySalary?: string;
}

const RankRewardPage = () => {
 

  const teamDepositTiers: RewardTier[] = [
	{
	  id: 5,
	  title: "Bronze Team",
	  target: "Team deposits $10,000",
	  reward: "100 USDT",
	  bonus: "+ Monthly Salary",
	  monthlySalary: "100 USDT/month",
	  progress: 8500,
	  completed: false,
	  icon: <FiDollarSign className="text-amber-600" />,
	  color: "from-amber-50 to-amber-100 border-amber-200"
	},
	{
	  id: 6,
	  title: "Silver Team",
	  target: "Team deposits $20,000",
	  reward: "200 USDT",
	  bonus: "+ Monthly Salary",
	  monthlySalary: "200 USDT/month",
	  progress: 18500,
	  completed: false,
	  icon: <FiDollarSign className="text-gray-400" />,
	  color: "from-gray-50 to-gray-100 border-gray-200"
	},
	{
	  id: 7,
	  title: "Gold Team",
	  target: "Team deposits $30,000",
	  reward: "300 USDT",
	  bonus: "+ Monthly Salary",
	  monthlySalary: "300 USDT/month",
	  progress: 27500,
	  completed: false,
	  icon: <FiDollarSign className="text-yellow-500" />,
	  color: "from-yellow-50 to-yellow-100 border-yellow-200"
	},
	{
	  id: 8,
	  title: "Platinum Team",
	  target: "Team deposits $40,000",
	  reward: "400 USDT",
	  bonus: "+ Monthly Salary",
	  monthlySalary: "400 USDT/month",
	  progress: 38500,
	  completed: false,
	  icon: <FiDollarSign className="text-blue-400" />,
	  color: "from-blue-50 to-blue-100 border-blue-200"
	},
	{
	  id: 9,
	  title: "Diamond Team",
	  target: "Team deposits $50,000",
	  reward: "600 USDT",
	  bonus: "+ Monthly Salary",
	  monthlySalary: "600 USDT/month",
	  progress: 48500,
	  completed: false,
	  icon: <FiDollarSign className="text-purple-500" />,
	  color: "from-purple-50 to-purple-100 border-purple-200"
	}
  ];

  const stats = {
	directReferrals: 89,
	directActiveMembers: 67,
	totalEarned: 1240,
	teamDeposits: 48500,
	nextReward: "Achiever (15/20)"
  };

  return (
	<div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
	  <div className="max-w-6xl mx-auto">
		{/* Header */}
		<div className="text-center mb-8">
		  <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 flex items-center justify-center">
			<FiAward className="mr-3 text-yellow-500" />
			Rank & Reward Program
		  </h1>
		  <p className="text-gray-600 max-w-2xl mx-auto">
			Complete tasks, earn rewards, and climb the ranks to unlock exclusive benefits
		  </p>
		</div>

		{/* Stats Overview */}
		<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
		  <StatCard 
			icon={<FiUsers className="text-blue-500" />}
			title="Direct Referrals"
			value={stats.directReferrals}
			color="blue"
		  />
		  <StatCard 
			icon={<FiUserCheck className="text-green-500" />}
			title="Active Members"
			value={stats.directActiveMembers}
			color="green"
		  />
		  <StatCard 
			icon={<FiDollarSign className="text-purple-500" />}
			title="Total Earned"
			value={`${stats.totalEarned} USDT`}
			color="purple"
		  />
		  <StatCard 
			icon={<FiBarChart2 className="text-amber-500" />}
			title="Team Deposits"
			value={`${stats.teamDeposits.toLocaleString()} USDT`}
			color="amber"
		  />
		</div>

		{/* Team Deposit Tiers Section */}
		<div className="mb-12">
		  <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
			<FiUsers className="mr-2 text-indigo-500" />
			Team Deposit Rewards
		  </h2>
		  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{teamDepositTiers.map((tier) => (
			  <TeamDepositCard key={tier.id} tier={tier} />
			))}
		  </div>
		</div>


		{/* Additional Info */}
		<div className="mt-12 bg-white rounded-xl shadow-md p-6 border border-gray-200">
		  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
			<FiGift className="mr-2 text-pink-500" />
			How It Works
		  </h3>
		  <ul className="space-y-3 text-gray-700">
			<li className="flex items-start">
			  <span className="text-green-500 mr-2">✓</span>
			  Invite friends to join and make their first deposit
			</li>
			<li className="flex items-start">
			  <span className="text-green-500 mr-2">✓</span>
			  Earn rewards when they complete qualifying deposits
			</li>
			<li className="flex items-start">
			  <span className="text-green-500 mr-2">✓</span>
			  Team deposits accumulate across your entire network
			</li>
			<li className="flex items-start">
			  <span className="text-green-500 mr-2">✓</span>
			  Monthly salaries are paid on the 1st of each month
			</li>
			<li className="flex items-start">
			  <span className="text-green-500 mr-2">✓</span>
			  Rewards are paid automatically within 24 hours
			</li>
		  </ul>
		</div>
	  </div>
	</div>
  );
};

// StatCard Component
const StatCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  value: string | number;
  color?: string;
}> = ({ icon, title, value, color = 'blue' }) => {
  const colors = {
	blue: 'bg-blue-50 text-blue-600 border-blue-200',
	green: 'bg-green-50 text-green-600 border-green-200',
	purple: 'bg-purple-50 text-purple-600 border-purple-200',
	yellow: 'bg-yellow-50 text-yellow-600 border-yellow-200',
	amber: 'bg-amber-50 text-amber-600 border-amber-200'
  };

  return (
	<motion.div 
	  whileHover={{ y: -3 }}
	  className={`p-4 rounded-xl border ${colors[color as keyof typeof colors]} shadow-sm`}
	>
	  <div className="flex items-center justify-between">
		<div>
		  <p className="text-xs sm:text-sm font-medium text-gray-500">{title}</p>
		  <p className="text-lg sm:text-xl font-bold">{value}</p>
		</div>
		<div className="p-2 rounded-full bg-white">
		  {icon}
		</div>
	  </div>
	</motion.div>
  );
};

// RewardCard Component for individual achievements
const RewardCard: React.FC<{ tier: RewardTier }> = ({ tier }) => {
  const targetMatch = tier.target.match(/\d+/);
  const targetNumber = targetMatch ? parseInt(targetMatch[0]) : 0;
  const progressPercentage = Math.min(100, (tier.progress / targetNumber) * 100);
  const isCompleted = progressPercentage >= 100;

  return (
	<motion.div
	  whileHover={{ scale: 1.02 }}
	  className={`border rounded-xl overflow-hidden bg-gradient-to-r ${tier.color}`}
	>
	  <div className="p-5">
		<div className="flex justify-between items-start mb-3">
		  <div>
			<h3 className="text-lg font-bold text-gray-800 flex items-center">
			  {tier.icon}
			  <span className="ml-2">{tier.title}</span>
			</h3>
			<p className="text-sm text-gray-600 mt-1">{tier.target}</p>
		  </div>
		  {isCompleted && (
			<span className="bg-white text-green-600 text-xs px-2 py-1 rounded-full flex items-center">
			  <FiCheckCircle className="mr-1" /> Completed
			</span>
		  )}
		</div>

		<div className="mb-4">
		  <div className="flex justify-between text-sm mb-1">
			<span className="font-medium">Progress: {tier.progress}/{targetNumber}</span>
			<span className="font-bold">{progressPercentage.toFixed(0)}%</span>
		  </div>
		  <div className="w-full bg-gray-200 rounded-full h-2.5">
			<div 
			  className="bg-gradient-to-r from-blue-500 to-purple-600 h-2.5 rounded-full" 
			  style={{ width: `${progressPercentage}%` }}
			></div>
		  </div>
		</div>

		<div className="grid grid-cols-2 gap-3">
		  <div className="bg-white/80 rounded-lg p-3 text-center">
			<p className="text-xs text-gray-500">Reward</p>
			<p className="font-bold text-green-600">{tier.reward}</p>
		  </div>
		  <div className="bg-white/80 rounded-lg p-3 text-center">
			<p className="text-xs text-gray-500">Bonus</p>
			<p className="font-bold text-purple-600">{tier.bonus}</p>
		  </div>
		</div>

		<button
		  className={`mt-4 w-full ${isCompleted ? 'bg-gradient-to-r from-green-500 to-teal-400' : 'bg-gray-300'} text-white py-2 rounded-lg font-medium text-sm hover:opacity-90 transition`}
		  disabled={!isCompleted}
		>
		  {isCompleted ? 'Claim Reward' : 'Target Not Reached'}
		</button>
	  </div>
	</motion.div>
  );
};

// TeamDepositCard Component for team deposit rewards
const TeamDepositCard: React.FC<{ tier: RewardTier }> = ({ tier }) => {
  const targetMatch = tier.target.match(/\$([\d,]+)/);
  const targetAmount = targetMatch ? parseInt(targetMatch[1].replace(/,/g, '')) : 0;
  const progressPercentage = Math.min(100, (tier.progress / targetAmount) * 100);
  const isCompleted = progressPercentage >= 100;

  return (
	<motion.div
	  whileHover={{ scale: 1.02 }}
	  className={`border rounded-xl overflow-hidden bg-gradient-to-r ${tier.color}`}
	>
	  <div className="p-5">
		<div className="flex justify-between items-start mb-3">
		  <div>
			<h3 className="text-lg font-bold text-gray-800 flex items-center">
			  {tier.icon}
			  <span className="ml-2">{tier.title}</span>
			</h3>
			<p className="text-sm text-gray-600 mt-1">{tier.target}</p>
		  </div>
		  {isCompleted && (
			<span className="bg-white text-green-600 text-xs px-2 py-1 rounded-full flex items-center">
			  <FiCheckCircle className="mr-1" /> Qualified
			</span>
		  )}
		</div>

		<div className="mb-4">
		  <div className="flex justify-between text-sm mb-1">
			<span className="font-medium">Progress: {tier.progress.toLocaleString()}/{targetAmount.toLocaleString()} USDT</span>
			<span className="font-bold">{progressPercentage.toFixed(0)}%</span>
		  </div>
		  <div className="w-full bg-gray-200 rounded-full h-2.5">
			<div 
			  className="bg-gradient-to-r from-green-500 to-teal-400 h-2.5 rounded-full" 
			  style={{ width: `${progressPercentage}%` }}
			></div>
		  </div>
		</div>

		<div className="grid grid-cols-2 gap-3 mb-3">
		  <div className="bg-white/80 rounded-lg p-3 text-center">
			<p className="text-xs text-gray-500">Instant Reward</p>
			<p className="font-bold text-green-600">{tier.reward}</p>
		  </div>
		  <div className="bg-white/80 rounded-lg p-3 text-center">
			<p className="text-xs text-gray-500">Monthly Salary</p>
			<p className="font-bold text-purple-600">{tier.monthlySalary}</p>
		  </div>
		</div>

		<div className="flex items-center text-xs text-gray-500 mt-2">
		  <FiCalendar className="mr-1" />
		  <span>Salary paid monthly on 1st</span>
		</div>

		<button
		  className={`mt-4 w-full ${isCompleted ? 'bg-gradient-to-r from-green-500 to-teal-400' : 'bg-gray-300'} text-white py-2 rounded-lg font-medium text-sm hover:opacity-90 transition`}
		  disabled={!isCompleted}
		>
		  {isCompleted ? 'Active - Auto Paid' : `Need ${(targetAmount - tier.progress).toLocaleString()} USDT`}
		</button>
	  </div>
	</motion.div>
  );
};

export default RankRewardPage;