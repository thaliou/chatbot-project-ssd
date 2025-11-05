import RobotProfileImage from '../assets/robot.png';
import UserProfileImage from '../assets/user.png';
import UserProfileImage1 from '../assets/profile-1.jpg';

import './ChatMessage.css';

export function ChatMessage(props) {
  const {message, sender, time} = props;

  
  // const time = dayjs().valueOf();
  // console.log(dayjs(time).format('HH:mm'));

/*
  if (sender === 'user') {
    return (
      <div>
        {message}
        <img 
          src="user.png"
          width="50px"
        />
      </div>
    );
  }
*/


  return (
    <div className={sender === 'user' 
      ? 'chat-message-user'
      : 'chat-message-robot'
      }>
      {
        sender === 'robot' &&
        <img 
          src={RobotProfileImage}
          className="chat-message-profile"
        />
      }

      <div className="chat-message-text">
        <div style={{marginBottom: '6px'}}>
          {message}
        </div>
        <small
          style={{ color: 'gray', fontSize: '10px', float: 'left' }}
        > {time}
        </small>
      </div>  

      {
          sender === 'user' && 
          <img 
            src={UserProfileImage1}
            className="chat-message-profile" 
          />
        }
    </div>
  );
}