import { useState } from "react";
import { GlobalStyle } from "./GlobalStyle";
import { Statistics } from "./Statistics/Statistics";
import { FeedbackOptions } from "./FeedbackOptions/FeedbackOptions";
import { Section } from "./Section/Section";
import { Notification } from "./Notification/Notification";


export const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const isNoFeedback = !good && !neutral && !bad;
  
  
  const countIncrement = data => {
    const countData = data.target.name;

    switch (countData) {
      case 'good':
        setGood(prevValue => prevValue + 1);
        break;
       
      case 'neutral':
        setNeutral(prevValue => prevValue + 1);
        break;
       
      case 'bad':
        setBad(prevValue => prevValue + 1);
        break;
       
      default:
        throw new Error('No this option');
    }
  };

  const countTotalFeedback = () => {
    return [good, neutral, bad].reduce((acc, num) => acc + num, 0);
  };

  const countPositiveFeedbackPercentage = () => {
    return Math.round((good / countTotalFeedback()) * 100);
  };

  return (
    <>
      <GlobalStyle />
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={['good', 'neutral', 'bad']}
          onLeaveFeedback={countIncrement} />
      </Section>
      <Section title="Statistics">
        {isNoFeedback ? (
          <Notification message="There is no feedback" />
        ) : (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={countTotalFeedback()}
            positivePercentage={countPositiveFeedbackPercentage()} />
        )}
      </Section>
    </>
            
  );
};
