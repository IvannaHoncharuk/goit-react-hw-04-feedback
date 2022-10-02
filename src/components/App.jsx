import { Component } from "react";
import { GlobalStyle } from "./GlobalStyle";
import { Statistics } from "./Statistics/Statistics";
import { FeedbackOptions } from "./FeedbackOptions/FeedbackOptions";
import { Section } from "./Section/Section";
import { Notification } from "./Notification/Notification";


export class App extends Component{
    state = {
      good: 0,
      neutral: 0,
      bad: 0
  }
  
  countIncrement = data => {
    this.setState(prevState => {
      return { [data]: prevState[data] + 1 };
    });
  };

  countTotalFeedback = () => {
    const { good, neutral, bad } = this.state;
    return [good, neutral, bad].reduce((acc, num) => acc + num, 0);
  };

  countPositiveFeedbackPercentage = () =>
    Math.round((this.state.good / this.countTotalFeedback()) * 100);
  

  render() {
    const { good, neutral, bad } = this.state;
    const isNoFeedback = Object.values(this.state).every(x => x === 0);
    
      return (
          <>
          <GlobalStyle />
          <Section title="Please leave feedback">
            <FeedbackOptions
              options={Object.keys(this.state)}
            onLeaveFeedback={this.countIncrement} />
          </Section>
          <Section title="Statistics">
             {isNoFeedback ? (
            <Notification message="There is no feedback" />
          ) : (
            <Statistics
              good={good}
              neutral={neutral}
              bad={bad}
              total={this.countTotalFeedback()}
              positivePercentage={this.countPositiveFeedbackPercentage()} />
            )}
           </Section>
         </>
            
      );
  }

}
