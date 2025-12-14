import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ArticleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock article data - in real app, fetch from API
  const articles = [
    {
      id: 1,
      title: "10 Tips for Heart Health",
      description: "Learn essential tips to keep your heart healthy and strong.",
      readTime: "9 min read",
      category: "Cardiology",
      date: "May 15, 2023",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56",
      content: `
        <h2>Introduction</h2>
        <p>Heart health is crucial for overall well-being. With heart disease being one of the leading causes of death worldwide, taking proactive steps to maintain cardiovascular health is essential.</p>

        <h2>1. Maintain a Healthy Diet</h2>
        <p>Eat a balanced diet rich in fruits, vegetables, whole grains, and lean proteins. Limit saturated fats, trans fats, and cholesterol. The Mediterranean diet has been shown to be particularly beneficial for heart health.</p>

        <h2>2. Stay Physically Active</h2>
        <p>Aim for at least 150 minutes of moderate aerobic activity or 75 minutes of vigorous activity each week. Regular exercise helps control weight, reduces blood pressure, and improves cholesterol levels.</p>

        <h2>3. Don't Smoke</h2>
        <p>Smoking is a major risk factor for heart disease. If you smoke, quitting is the best thing you can do for your heart health. Seek support if needed.</p>

        <h2>4. Manage Stress</h2>
        <p>Chronic stress can contribute to heart disease. Practice stress-reduction techniques like meditation, yoga, or deep breathing exercises.</p>

        <h2>5. Get Regular Check-ups</h2>
        <p>Regular medical check-ups can help detect heart problems early. Monitor your blood pressure, cholesterol levels, and blood sugar regularly.</p>

        <h2>6. Maintain a Healthy Weight</h2>
        <p>Being overweight increases your risk of heart disease. Aim for a healthy BMI and waist circumference.</p>

        <h2>7. Limit Alcohol Consumption</h2>
        <p>If you drink alcohol, do so in moderation. Excessive drinking can raise blood pressure and contribute to heart disease.</p>

        <h2>8. Get Enough Sleep</h2>
        <p>Aim for 7-9 hours of quality sleep per night. Poor sleep can increase the risk of heart disease.</p>

        <h2>9. Control Diabetes</h2>
        <p>If you have diabetes, work with your healthcare provider to manage your blood sugar levels effectively.</p>

        <h2>10. Know Your Family History</h2>
        <p>Understanding your family history of heart disease can help you take preventive measures.</p>

        <h2>Conclusion</h2>
        <p>By following these tips, you can significantly reduce your risk of heart disease and maintain better cardiovascular health. Remember, small changes can make a big difference over time.</p>
      `
    },
    {
      id: 2,
      title: "Understanding Diabetes",
      description: "A comprehensive guide to managing diabetes effectively.",
      readTime: "6 min read",
      category: "Endocrinology",
      date: "April 28, 2023",
      image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063",
      content: `
        <h2>What is Diabetes?</h2>
        <p>Diabetes is a chronic condition that affects how your body processes blood sugar (glucose). There are several types of diabetes, with Type 1, Type 2, and gestational diabetes being the most common.</p>

        <h2>Types of Diabetes</h2>
        <h3>Type 1 Diabetes</h3>
        <p>An autoimmune condition where the body doesn't produce insulin. It usually develops in childhood or young adulthood.</p>

        <h3>Type 2 Diabetes</h3>
        <p>The most common type, where the body becomes resistant to insulin or doesn't produce enough insulin. It's often linked to lifestyle factors.</p>

        <h3>Gestational Diabetes</h3>
        <p>Develops during pregnancy and usually resolves after delivery, but increases the risk of Type 2 diabetes later.</p>

        <h2>Symptoms</h2>
        <ul>
          <li>Frequent urination</li>
          <li>Increased thirst</li>
          <li>Extreme hunger</li>
          <li>Unexplained weight loss</li>
          <li>Fatigue</li>
          <li>Slow-healing sores</li>
          <li>Frequent infections</li>
        </ul>

        <h2>Management Strategies</h2>
        <h3>Monitoring Blood Sugar</h3>
        <p>Regular blood sugar monitoring helps you understand how food, exercise, and medication affect your levels.</p>

        <h3>Healthy Eating</h3>
        <p>Focus on balanced meals with complex carbohydrates, lean proteins, and healthy fats. Portion control is key.</p>

        <h3>Regular Exercise</h3>
        <p>Physical activity helps your body use insulin more effectively and can lower blood sugar levels.</p>

        <h3>Medication</h3>
        <p>Depending on your type of diabetes, you may need insulin injections, oral medications, or other treatments.</p>

        <h2>Prevention</h2>
        <p>While Type 1 diabetes can't be prevented, Type 2 diabetes can often be delayed or prevented through lifestyle changes including maintaining a healthy weight, eating well, and staying active.</p>

        <h2>Conclusion</h2>
        <p>Diabetes is a manageable condition. With proper care, monitoring, and lifestyle adjustments, people with diabetes can live healthy, active lives.</p>
      `
    },
    {
      id: 3,
      title: "Mental Health Awareness",
      description: "Breaking the stigma around mental health discussions.",
      readTime: "5 min read",
      category: "Psychiatry",
      date: "June 2, 2023",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56",
      content: `
        <h2>The Importance of Mental Health</h2>
        <p>Mental health is just as important as physical health. It affects how we think, feel, and act, and it also helps determine how we handle stress, relate to others, and make choices.</p>

        <h2>Common Mental Health Conditions</h2>
        <h3>Anxiety Disorders</h3>
        <p>Characterized by excessive worry, fear, or nervousness that interferes with daily activities.</p>

        <h3>Depression</h3>
        <p>A mood disorder involving persistent feelings of sadness, hopelessness, and loss of interest in activities.</p>

        <h3>Bipolar Disorder</h3>
        <p>Involves extreme mood swings ranging from emotional highs to emotional lows.</p>

        <h3>PTSD</h3>
        <p>Post-traumatic stress disorder can develop after experiencing or witnessing a traumatic event.</p>

        <h2>Breaking the Stigma</h2>
        <p>Mental health stigma prevents many people from seeking help. It's important to understand that mental health conditions are medical conditions, not personal failings.</p>

        <h2>Signs You Might Need Help</h2>
        <ul>
          <li>Feeling persistently sad or hopeless</li>
          <li>Losing interest in activities you once enjoyed</li>
          <li>Having trouble sleeping or sleeping too much</li>
          <li>Feeling anxious or worried most of the time</li>
          <li>Having difficulty concentrating</li>
          <li>Experiencing mood swings</li>
          <li>Withdrawing from social activities</li>
        </ul>

        <h2>Seeking Help</h2>
        <p>If you're experiencing mental health challenges, remember that help is available. Talk to a trusted friend or family member, consult a healthcare professional, or contact a mental health hotline.</p>

        <h2>Supporting Others</h2>
        <p>If someone you know is struggling, offer support without judgment. Listen actively, encourage professional help, and educate yourself about mental health.</p>

        <h2>Self-Care Strategies</h2>
        <h3>Exercise Regularly</h3>
        <p>Physical activity releases endorphins that can improve mood and reduce stress.</p>

        <h3>Eat Well</h3>
        <p>A balanced diet supports brain health and can stabilize mood.</p>

        <h3>Get Enough Sleep</h3>
        <p>Aim for 7-9 hours of quality sleep per night.</p>

        <h3>Practice Mindfulness</h3>
        <p>Techniques like meditation can help manage stress and anxiety.</p>

        <h3>Stay Connected</h3>
        <p>Maintain relationships with friends and family for emotional support.</p>

        <h2>Conclusion</h2>
        <p>Mental health matters. By understanding mental health conditions, breaking the stigma, and supporting those who need help, we can create a more compassionate and healthier society.</p>
      `
    }
  ];

  const article = articles.find(a => a.id === parseInt(id));

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Article Not Found</h1>
          <button
            onClick={() => navigate('/articles')}
            className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700"
          >
            Back to Articles
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/articles')}
          className="mb-6 text-green-600 hover:text-green-700 font-medium flex items-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Articles
        </button>

        {/* Article Header */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-64 object-cover"
          />
          <div className="p-8">
            <div className="flex items-center justify-between mb-4">
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                {article.category}
              </span>
              <span className="text-gray-500 text-sm">{article.readTime}</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">{article.title}</h1>
            <p className="text-gray-600 mb-4">{article.description}</p>
            <div className="text-sm text-gray-500">Published on {article.date}</div>
          </div>
        </div>

        {/* Article Content */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;