const getWellnessData = (req, res) => {
  res.json({
    breathingExercises: [
      { id: "1", name: "4-4-6 Breathing", description: "Calm and relaxing breathing pattern", inhaleTime: 4, holdTime: 4, exhaleTime: 6, cycles: 5, color: "text-blue-600", icon: "Wind" },
      { id: "2", name: "Box Breathing", description: "Military technique for focus and calm", inhaleTime: 4, holdTime: 4, exhaleTime: 4, cycles: 8, color: "text-green-600", icon: "Target" },
      { id: "3", name: "Deep Relaxation", description: "Slow and deep breathing for sleep", inhaleTime: 6, holdTime: 2, exhaleTime: 8, cycles: 6, color: "text-purple-600", icon: "Moon" }
    ],
    meditations: [
      { id: "1", title: "Morning Mindfulness", duration: 10, description: "Start your day with intention and awareness", category: "Morning", color: "text-yellow-600", icon: "Sun" },
      { id: "2", title: "Stress Relief", duration: 15, description: "Release tension and find inner peace", category: "Stress", color: "text-red-500", icon: "Heart" },
      { id: "3", title: "Sleep Preparation", duration: 20, description: "Wind down and prepare for restful sleep", category: "Sleep", color: "text-blue-600", icon: "Moon" },
      { id: "4", title: "Focus & Concentration", duration: 12, description: "Enhance mental clarity and focus", category: "Focus", color: "text-purple-600", icon: "Brain" }
    ],
    wellnessTips: [
      { id: "1", title: "Stay Hydrated", description: "Drink at least 8 glasses of water throughout the day", color: "text-blue-600", icon: "Waves" },
      { id: "2", title: "Take Short Breaks", description: "Step away from your screen every 30 minutes", color: "text-green-600", icon: "Clock" },
      { id: "3", title: "Practice Gratitude", description: "Write down three things you're grateful for each day", color: "text-yellow-600", icon: "Star" },
      { id: "4", title: "Connect with Nature", description: "Spend time outdoors, even if just for a few minutes", color: "text-emerald-600", icon: "TreePine" },
      { id: "5", title: "Move Your Body", description: "Take a short walk or do some gentle stretching", color: "text-orange-600", icon: "Zap" }
    ],
    quotes: [
      { text: "The present moment is the only time over which we have dominion.", author: "Thích Nhất Hạnh" },
      { text: "Peace comes from within. Do not seek it without.", author: "Buddha" },
      { text: "Mindfulness is about being fully awake in our lives.", author: "Jon Kabat-Zinn" },
      { text: "The mind is everything. What you think you become.", author: "Buddha" },
      { text: "Wherever you are, be there totally.", author: "Eckhart Tolle" }
    ],
    dailyChallenges: [
      { title: "5-Minute Meditation", description: "Complete a short meditation session", progress: 60, color: "text-purple-400", icon: "Brain" },
      { title: "Deep Breathing", description: "Practice breathing exercises", progress: 100, color: "text-blue-400", icon: "Wind" },
      { title: "Gratitude Journal", description: "Write down three things you're grateful for", progress: 40, color: "text-yellow-400", icon: "Star" }
    ]
  });
};
module.exports = { getWellnessData };