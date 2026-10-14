
export const socialEngineeringScenarios = [
  {
    id: "perfect-match",
    title: "The Perfect Match",
    subtitle: "Someone knows exactly what you like.",
    category: "BEHAVIORAL TARGETING",

    story:
      "You regularly browse skincare products and recently searched for a Vitamin C serum. Today, a special offer appears on your phone.",

    sender: "GlowCare Exclusive Deals",
    source: "Sponsored message · Unverified sender",

    message:
      "Hey! We noticed you love our Vitamin C Serum. Your favorite product is now 80% OFF! This private offer was selected just for you. Claim it in the next 10 minutes.",

    request:
      "Tap the exclusive link and sign in with your shopping account to unlock the discount.",

    link: "glowcare-vip-rewards.example",

    clues: [
      {
        title: "Personalized Information",
        description:
          "The message mentions a product you recently searched for.",
      },
      {
        title: "Urgency",
        description:
          "You are pressured to act within 10 minutes.",
      },
      {
        title: "Unverified Website",
        description:
          "The link is not confirmed as the retailer's official website.",
      },
      {
        title: "Login Request",
        description:
          "The offer asks you to enter account credentials.",
      },
    ],

    choices: [
      {
        id: "trust",
        title: "Open the link and sign in",
        description: "Claim the personalized discount.",
        safe: false,
        feedback:
          "The attacker used your shopping interests to make the fake offer convincing. Entering your password on an unverified site could expose your account.",
      },
      {
        id: "verify",
        title: "Check the official shopping app",
        description: "Look for the offer independently.",
        safe: true,
        feedback:
          "Excellent decision! You recognized that knowing your interests does not prove a message is legitimate. Checking the official app avoids the suspicious link.",
      },
      {
        id: "report",
        title: "Ignore and report the message",
        description:
          "Avoid the link and report suspicious activity.",
        safe: true,
        feedback:
          "Good decision! Reporting suspicious messages can help protect others. You did not allow the personalized advertisement to influence your security decision.",
      },
    ],

    hint:
      "Ask yourself: How does the sender know your interests, and does that prove the website is legitimate?",

    lesson:
      "Attackers can use browsing interests, public information, or leaked data to create convincing personalized scams.",
  },

  
{
  id: "genuine-loyalty-reward",
  title: "The Genuine Loyalty Reward",
  subtitle: "Not every personalized offer is a scam.",
  category: "LEGITIMATE PERSONALIZED MARKETING",

  story:
    "You are a regular customer at GlowCare, a skincare store. You recently purchased several products through its official app. Today, you receive a loyalty reward notification directly inside the app.",

  sender: "GlowCare Official Rewards",
  source: "Verified notification · Official GlowCare app",

  message:
    "Thank you for being a loyal GlowCare customer! Based on your recent purchases, you have earned 20% OFF your next skincare order. Your reward is now available in your account.",

  request:
    "Tap View Reward to open the official GlowCare rewards page. You can sign in through the official app if your session has expired.",

  link: "https://glowcare.example/rewards",

  clues: [
    {
      title: "Official App Notification",
      description:
        "The notification appears inside the official shopping app that you opened yourself.",
    },
    {
      title: "Verified Website",
      description:
        "The reward opens the same official domain shown in the store's verified app information.",
    },
    {
      title: "No Sensitive Information Requested",
      description:
        "The offer does not ask you to share your password, OTP, or payment details with another person.",
    },
    {
      title: "No Suspicious Urgency",
      description:
        "The reward is available in your account without pressure to act immediately.",
    },
  ],

  choices: [
    {
      id: "accept",
      title: "Open the reward in the official app",
      description:
        "View the offer and sign in normally if needed.",
      safe: true,
      feedback:
        "Excellent! You verified that the reward was available inside the official app and used its trusted sign-in process. Personalized marketing can be legitimate when the source and destination are verified.",
    },
    {
      id: "verify",
      title: "Check the Rewards section first",
      description:
        "Navigate to your account rewards independently.",
      safe: true,
      feedback:
        "Great decision! Checking the official Rewards section is another safe way to confirm the offer before using it.",
    },
    {
      id: "reject",
      title: "Report the message as phishing",
      description:
        "Assume every personalized offer is malicious.",
      safe: false,
      feedback:
        "Being cautious is good, but this notification was legitimate. It appeared inside the official app, used the verified destination, and did not request unusual sensitive information. Reporting every personalized offer without evaluating the evidence can lead to false positives.",
    },
  ],

  hint:
    "Look at where the notification appeared. Is it inside the official app? Does it lead to the verified website? Are there unusual requests?",

  lesson:
    "Personalization alone does not mean a message is malicious. Evaluate the source, destination, requested action, and context before deciding whether an offer is safe.",
  },
];
