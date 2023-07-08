import { Section } from './Section';
import { Statistics } from './Statistics';
import { FeedbackOptions } from './FeedbackOptions';

import React from 'react';
import { Notification } from './Notification';

export class App extends React.Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };
  // змінюємо кількість відгуків записуючи у з відповідної кнопки за рахунок динамічного ключа [name] для будь-якої кнопки
  onLeaveFeedback = event => {
    const { name } = event.target; //деструктиризація імя кнопки з event.target.name

    this.setState(prevState => ({
      [name]: prevState[name] + 1,
    }));
  };

  countTotalFeedback = () => {
    const { good, neutral, bad } = this.state;
    return good + neutral + bad;
  };

  countPositiveFeedbackPercentage = () => {
    const { good } = this.state;
    const total = this.countTotalFeedback();
    if (total === 0) {
      return 0;
    }
    return Math.round((good / total) * 100);
  };

  render() {
    const { good, neutral, bad } = this.state;
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: 400,
          gap: 10,
          alignItems: 'center',
          padding: 30,
          margin: '0 auto',
        }}
      >
        <Section title="Please leave feedback">
          <FeedbackOptions
            //! передача масиву назв (ключів) полів state (good, neutral, bad)
            options={Object.keys(this.state)}
            onLeaveFeedback={this.onLeaveFeedback}
          />
        </Section>
        <Section title="Statistics">
          {/* через тернарний оператор прописуємо виведення статистики або
          повідомлення */}
          {this.countTotalFeedback() ? (
            <Statistics
              good={good}
              neutral={neutral}
              bad={bad}
              total={this.countTotalFeedback()}
              positivePercentage={this.countPositiveFeedbackPercentage()}
            />
          ) : (
            <Notification message="There is no feedback" />
          )}
        </Section>
      </div>
    );
  }
}
