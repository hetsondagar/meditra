import { useState, useEffect, useRef } from "react";
import PageLayout from "@/components/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX,
  Heart,
  Brain,
  Leaf,
  Sun,
  Moon,
  Star,
  Target,
  Award,
  Clock,
  Zap,
  Sparkles,
  Wind,
  Waves,
  Mountain,
  TreePine
} from "lucide-react";

interface BreathingExercise {
  id: string;
  name: string;
  description: string;
  inhaleTime: number;
  holdTime: number;
  exhaleTime: number;
  cycles: number;
  color: string;
  icon: React.ReactNode;
}

interface Meditation {
  id: string;
  title: string;
  duration: number;
  description: string;
  category: string;
  icon: React.ReactNode;
  color: string;
}

interface WellnessTip {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

interface Quote {
  text: string;
  author: string;
}

const WellnessCoach = () => {
  const [isBreathing, setIsBreathing] = useState(false);
  const [breathingPhase, setBreathingPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [breathingProgress, setBreathingProgress] = useState(0);
  const [selectedExercise, setSelectedExercise] = useState<BreathingExercise | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentMeditation, setCurrentMeditation] = useState<Meditation | null>(null);
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const [currentQuote, setCurrentQuote] = useState<Quote | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [typedQuote, setTypedQuote] = useState("");
  const [volume, setVolume] = useState([50]);
  const [isMuted, setIsMuted] = useState(false);
  
  const breathingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const tipIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const quoteIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const breathingExercises: BreathingExercise[] = [
    {
      id: "1",
      name: "4-4-6 Breathing",
      description: "Calm and relaxing breathing pattern",
      inhaleTime: 4,
      holdTime: 4,
      exhaleTime: 6,
      cycles: 5,
      color: "text-blue-600",
      icon: <Wind className="w-5 h-5" />
    },
    {
      id: "2",
      name: "Box Breathing",
      description: "Military technique for focus and calm",
      inhaleTime: 4,
      holdTime: 4,
      exhaleTime: 4,
      cycles: 8,
      color: "text-green-600",
      icon: <Target className="w-5 h-5" />
    },
    {
      id: "3",
      name: "Deep Relaxation",
      description: "Slow and deep breathing for sleep",
      inhaleTime: 6,
      holdTime: 2,
      exhaleTime: 8,
      cycles: 6,
      color: "text-purple-600",
      icon: <Moon className="w-5 h-5" />
    }
  ];

  const meditations: Meditation[] = [
    {
      id: "1",
      title: "Morning Mindfulness",
      duration: 10,
      description: "Start your day with intention and awareness",
      category: "Morning",
      icon: <Sun className="w-5 h-5" />,
      color: "text-yellow-600"
    },
    {
      id: "2",
      title: "Stress Relief",
      duration: 15,
      description: "Release tension and find inner peace",
      category: "Stress",
      icon: <Heart className="w-5 h-5" />,
      color: "text-red-500"
    },
    {
      id: "3",
      title: "Sleep Preparation",
      duration: 20,
      description: "Wind down and prepare for restful sleep",
      category: "Sleep",
      icon: <Moon className="w-5 h-5" />,
      color: "text-blue-600"
    },
    {
      id: "4",
      title: "Focus & Concentration",
      duration: 12,
      description: "Enhance mental clarity and focus",
      category: "Focus",
      icon: <Brain className="w-5 h-5" />,
      color: "text-purple-600"
    }
  ];

  const wellnessTips: WellnessTip[] = [
    {
      id: "1",
      title: "Stay Hydrated",
      description: "Drink at least 8 glasses of water throughout the day",
      icon: <Waves className="w-5 h-5" />,
      color: "text-blue-600"
    },
    {
      id: "2",
      title: "Take Short Breaks",
      description: "Step away from your screen every 30 minutes",
      icon: <Clock className="w-5 h-5" />,
      color: "text-green-600"
    },
    {
      id: "3",
      title: "Practice Gratitude",
      description: "Write down three things you're grateful for each day",
      icon: <Star className="w-5 h-5" />,
      color: "text-yellow-600"
    },
    {
      id: "4",
      title: "Connect with Nature",
      description: "Spend time outdoors, even if just for a few minutes",
      icon: <TreePine className="w-5 h-5" />,
      color: "text-emerald-600"
    },
    {
      id: "5",
      title: "Move Your Body",
      description: "Take a short walk or do some gentle stretching",
      icon: <Zap className="w-5 h-5" />,
      color: "text-orange-600"
    }
  ];

  const quotes: Quote[] = [
    {
      text: "The present moment is the only time over which we have dominion.",
      author: "Thích Nhất Hạnh"
    },
    {
      text: "Peace comes from within. Do not seek it without.",
      author: "Buddha"
    },
    {
      text: "Mindfulness is about being fully awake in our lives.",
      author: "Jon Kabat-Zinn"
    },
    {
      text: "The mind is everything. What you think you become.",
      author: "Buddha"
    },
    {
      text: "Wherever you are, be there totally.",
      author: "Eckhart Tolle"
    }
  ];

  useEffect(() => {
    setSelectedExercise(breathingExercises[0]);
    setCurrentQuote(quotes[0]);
    
    // Auto-rotate tips
    tipIntervalRef.current = setInterval(() => {
      setCurrentTipIndex(prev => (prev + 1) % wellnessTips.length);
    }, 5000);

    // Auto-rotate quotes with typing effect
    quoteIntervalRef.current = setInterval(() => {
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      setCurrentQuote(randomQuote);
      typeQuote(randomQuote.text);
    }, 10000);

    return () => {
      if (tipIntervalRef.current) clearInterval(tipIntervalRef.current);
      if (quoteIntervalRef.current) clearInterval(quoteIntervalRef.current);
      if (breathingIntervalRef.current) clearInterval(breathingIntervalRef.current);
    };
  }, []);

  const typeQuote = (text: string) => {
    setIsTyping(true);
    setTypedQuote("");
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < text.length) {
        setTypedQuote(text.slice(0, i + 1));
        i++;
      } else {
        setIsTyping(false);
        clearInterval(typingInterval);
      }
    }, 50);
  };

  const startBreathing = () => {
    if (!selectedExercise) return;
    
    setIsBreathing(true);
    setBreathingProgress(0);
    setBreathingPhase('inhale');
    
    const totalTime = selectedExercise.inhaleTime + selectedExercise.holdTime + selectedExercise.exhaleTime;
    const intervalTime = 100; // Update every 100ms
    const totalSteps = (totalTime * 1000) / intervalTime;
    let currentStep = 0;
    
    breathingIntervalRef.current = setInterval(() => {
      currentStep++;
      const progress = (currentStep / totalSteps) * 100;
      setBreathingProgress(progress);
      
      if (progress <= (selectedExercise.inhaleTime / totalTime) * 100) {
        setBreathingPhase('inhale');
      } else if (progress <= ((selectedExercise.inhaleTime + selectedExercise.holdTime) / totalTime) * 100) {
        setBreathingPhase('hold');
      } else {
        setBreathingPhase('exhale');
      }
      
      if (currentStep >= totalSteps) {
        currentStep = 0;
        setBreathingProgress(0);
      }
    }, intervalTime);
  };

  const stopBreathing = () => {
    setIsBreathing(false);
    setBreathingProgress(0);
    setBreathingPhase('inhale');
    if (breathingIntervalRef.current) {
      clearInterval(breathingIntervalRef.current);
    }
  };

  const getBreathingColor = () => {
    switch (breathingPhase) {
      case 'inhale': return 'text-green-600';
      case 'hold': return 'text-blue-600';
      case 'exhale': return 'text-purple-600';
      default: return 'text-gray-600';
    }
  };

  const getBreathingSize = () => {
    if (!isBreathing) return 200;
    
    switch (breathingPhase) {
      case 'inhale': return 200 + (breathingProgress * 2);
      case 'hold': return 300;
      case 'exhale': return 300 - (breathingProgress * 2);
      default: return 200;
    }
  };

  return (
    <PageLayout 
      title="Wellness Coach" 
      subtitle="Mindfulness, meditation, and wellness guidance for your health journey"
    >
      <div className="space-y-8">
        {/* Breathing Exercise */}
        <Card className="animate-fade-in-up bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-500/20">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Wind className="w-5 h-5 text-blue-400" />
              <span className="text-foreground">Breathing Exercise</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Breathing Circle */}
              <div className="flex flex-col items-center justify-center space-y-6">
                <div className="relative">
                  <div 
                    className="rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30 flex items-center justify-center transition-all duration-1000 ease-in-out"
                    style={{ 
                      width: getBreathingSize(), 
                      height: getBreathingSize() 
                    }}
                  >
                    <div className="text-center">
                      <div className={`text-2xl font-bold mb-2 ${getBreathingColor()}`}>
                        {breathingPhase.toUpperCase()}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {selectedExercise?.name}
                      </div>
                    </div>
                  </div>
                  {isBreathing && (
                    <div className="absolute inset-0 rounded-full border-4 border-blue-300 animate-ping"></div>
                  )}
                </div>
                
                <div className="flex space-x-4">
                  <Button
                    onClick={isBreathing ? stopBreathing : startBreathing}
                    className={`px-8 py-3 ${
                      isBreathing 
                        ? 'bg-red-500 hover:bg-red-600' 
                        : 'bg-gradient-primary hover:shadow-elevated'
                    } transition-all duration-300`}
                  >
                    {isBreathing ? (
                      <>
                        <Pause className="w-4 h-4 mr-2" />
                        Stop
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 mr-2" />
                        Start
                      </>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={stopBreathing}
                    className="px-6 py-3"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset
                  </Button>
                </div>
              </div>

              {/* Exercise Selection */}
              <div className="space-y-4">
                <h3 className="font-medium text-foreground mb-4">Choose Exercise</h3>
                {breathingExercises.map((exercise, index) => (
                  <div 
                    key={exercise.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all duration-300 hover:shadow-medium animate-fade-in ${
                      selectedExercise?.id === exercise.id 
                        ? 'border-blue-500/50 bg-blue-500/10' 
                        : 'border-border/50 bg-card/30 hover:border-blue-500/30'
                    }`}
                    style={{ animationDelay: `${index * 100}ms` }}
                    onClick={() => setSelectedExercise(exercise)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-full bg-blue-500/20 border border-blue-500/30 ${exercise.color}`}>
                        {exercise.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground">{exercise.name}</h4>
                        <p className="text-sm text-muted-foreground">{exercise.description}</p>
                        <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                          <span>Inhale: {exercise.inhaleTime}s</span>
                          <span>Hold: {exercise.holdTime}s</span>
                          <span>Exhale: {exercise.exhaleTime}s</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Meditation Player */}
          <Card className="animate-fade-in-up bg-card/50 border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Brain className="w-5 h-5 text-purple-400" />
                <span className="text-foreground">Meditation Library</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {meditations.map((meditation, index) => (
                  <div 
                    key={meditation.id}
                    className={`p-4 border rounded-lg transition-all duration-300 hover:shadow-medium animate-fade-in ${
                      currentMeditation?.id === meditation.id 
                        ? 'border-purple-500/50 bg-purple-500/10' 
                        : 'border-border/50 bg-card/30 hover:border-purple-500/30'
                    }`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-full bg-purple-500/20 border border-purple-500/30 ${meditation.color}`}>
                          {meditation.icon}
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground">{meditation.title}</h4>
                          <p className="text-sm text-muted-foreground">{meditation.description}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge variant="secondary" className="text-xs">
                              {meditation.category}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {meditation.duration} min
                            </span>
                          </div>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => {
                          setCurrentMeditation(meditation);
                          setIsPlaying(!isPlaying);
                        }}
                        className="bg-gradient-primary hover:shadow-elevated"
                      >
                        {isPlaying && currentMeditation?.id === meditation.id ? (
                          <Pause className="w-4 h-4" />
                        ) : (
                          <Play className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Audio Controls */}
              {currentMeditation && (
                <div className="mt-6 p-4 bg-card/30 border border-border/50 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-medium text-foreground">{currentMeditation.title}</h4>
                      <p className="text-sm text-muted-foreground">Now Playing</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsMuted(!isMuted)}
                    >
                      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </Button>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Volume</span>
                        <span>{volume[0]}%</span>
                      </div>
                      <Slider
                        value={volume}
                        onValueChange={setVolume}
                        max={100}
                        step={1}
                        className="w-full"
                      />
                    </div>
                    <Progress value={30} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>2:30</span>
                      <span>{currentMeditation.duration}:00</span>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Wellness Tips Carousel */}
          <Card className="animate-fade-in-up bg-card/50 border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-yellow-400" />
                <span className="text-foreground">Daily Wellness Tips</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Current Tip */}
                <div className="p-6 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-lg border border-yellow-500/30">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className={`p-3 rounded-full bg-yellow-500/20 border border-yellow-500/30 ${wellnessTips[currentTipIndex]?.color}`}>
                      {wellnessTips[currentTipIndex]?.icon}
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">
                        {wellnessTips[currentTipIndex]?.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {wellnessTips[currentTipIndex]?.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Tip Indicators */}
                <div className="flex justify-center space-x-2">
                  {wellnessTips.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentTipIndex ? 'bg-yellow-400' : 'bg-muted-foreground/50'
                      }`}
                    />
                  ))}
                </div>

                {/* All Tips Preview */}
                <div className="space-y-3">
                  <h4 className="font-medium text-foreground">All Tips</h4>
                  {wellnessTips.map((tip, index) => (
                    <div 
                      key={tip.id}
                      className={`p-3 border rounded-lg transition-all duration-300 animate-fade-in ${
                        index === currentTipIndex 
                          ? 'border-yellow-500/50 bg-yellow-500/10' 
                          : 'border-border/50 bg-card/30'
                      }`}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-full bg-muted border border-border/50 ${tip.color}`}>
                          {tip.icon}
                        </div>
                        <div>
                          <h5 className="font-medium text-sm text-foreground">{tip.title}</h5>
                          <p className="text-xs text-muted-foreground">{tip.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Inspirational Quote */}
        <Card className="animate-fade-in-up bg-gradient-to-r from-purple-900/20 to-pink-900/20 border border-purple-500/20">
          <CardContent className="p-8">
            <div className="text-center">
              <div className="mb-6">
                <Sparkles className="w-8 h-8 text-purple-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-4">Daily Inspiration</h3>
              </div>
              
              <div className="max-w-2xl mx-auto">
                <blockquote className="text-xl text-foreground mb-4 min-h-[3rem]">
                  {isTyping ? (
                    <span>
                      {typedQuote}
                      <span className="animate-pulse">|</span>
                    </span>
                  ) : (
                    currentQuote?.text
                  )}
                </blockquote>
                <cite className="text-sm text-muted-foreground">
                  — {currentQuote?.author}
                </cite>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Daily Challenges */}
        <Card className="animate-fade-in-up bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-green-400" />
              <span className="text-foreground">Daily Challenges</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "5-Minute Meditation",
                  description: "Complete a short meditation session",
                  progress: 60,
                  icon: <Brain className="w-5 h-5" />,
                  color: "text-purple-400"
                },
                {
                  title: "Deep Breathing",
                  description: "Practice breathing exercises",
                  progress: 100,
                  icon: <Wind className="w-5 h-5" />,
                  color: "text-blue-400"
                },
                {
                  title: "Gratitude Journal",
                  description: "Write down three things you're grateful for",
                  progress: 40,
                  icon: <Star className="w-5 h-5" />,
                  color: "text-yellow-400"
                }
              ].map((challenge, index) => (
                <div 
                  key={index}
                  className="p-4 border border-border/50 bg-card/30 rounded-lg hover:shadow-medium transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className={`p-2 rounded-full bg-muted border border-border/50 ${challenge.color}`}>
                      {challenge.icon}
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">{challenge.title}</h4>
                      <p className="text-sm text-muted-foreground">{challenge.description}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="text-foreground">{challenge.progress}%</span>
                    </div>
                    <Progress value={challenge.progress} className="h-2" />
                    {challenge.progress === 100 && (
                      <Badge className="bg-green-500/20 text-green-400 border border-green-500/30">
                        <Award className="w-3 h-3 mr-1" />
                        Completed!
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default WellnessCoach;
