import { useState, useEffect } from 'react'
import { MarkdownStyle } from '../components/MarkdownStyle'
import { EmailComposeBox } from '../components/EmailComposeBox'
import { ScheduleViewer } from '../components/ScheduleViewer'
import './style/MessageViewer.css'

// Icons
import userIcon from '../assets/icon/user_icon.png'
import pinacLogo from '../assets/icon/pinac-logo.png'

type HumanMessageProps = {
  response: string;
};


export const HumanMessage: React.FC<HumanMessageProps> = (props) => {
  const [isAvatarVisible, setIsAvatarVisible] = useState(window.innerWidth > 576); // Initial state based on window size

  // Handle window resize and update avatar visibility
  useEffect(() => {
    const updateAvatarVisibility = () => {
      setIsAvatarVisible(window.innerWidth > 576)
    }
    window.addEventListener('resize', updateAvatarVisibility)
    // Cleanup function to remove the event listener
    return () => window.removeEventListener('resize', updateAvatarVisibility)
  }, [])

  return (
    <>
      <div className="msg-row">
        {isAvatarVisible && (
          <div className="msg-avatar">
            <img src={userIcon} alt="User Avatar" />
          </div>
        )}
        <div className="msg-content">
          <div className="msg-name">You</div>
          <div className="msg-text human-msg">{props.response}</div>
        </div>
      </div>
    </>
  )
}

type AiMessageProps = {
  response: string;
};

export const AiMessage: React.FC<AiMessageProps> = (props) => {
  const [isAvatarVisible, setIsAvatarVisible] = useState(window.innerWidth > 576); // Initial state based on window size

  // Handle window resize and update avatar visibility
  useEffect(() => {
    const updateAvatarVisibility = () => {
      setIsAvatarVisible(window.innerWidth > 576)
    }
    window.addEventListener('resize', updateAvatarVisibility)
    // Cleanup function to remove the event listener
    return () => window.removeEventListener('resize', updateAvatarVisibility)
  }, [])

  return (
    <>
      <div className="msg-row">
        {isAvatarVisible && (
          <div className="msg-avatar">
            <img src={pinacLogo} alt="AI Avatar" />
          </div>
        )}
        <div className="msg-content">
          <div className="msg-name">PINAC</div>
          <div className="msg-text ai-msg">
            <MarkdownStyle text={props.response} />
          </div>
        </div>
      </div>
    </>
  )
}

type EmailMessageProps = {
  response: string;
  subject: string;
  body: string;
};

export const EmailMessage: React.FC<EmailMessageProps> = (props) => {
  const [isAvatarVisible, setIsAvatarVisible] = useState(window.innerWidth > 576); // Initial state based on window size

  // Handle window resize and update avatar visibility
  useEffect(() => {
    const updateAvatarVisibility = () => {
      setIsAvatarVisible(window.innerWidth > 576)
    }
    window.addEventListener('resize', updateAvatarVisibility)
    // Cleanup function to remove the event listener
    return () => window.removeEventListener('resize', updateAvatarVisibility)
  }, [])

  return (
    <>
      <div className="msg-row">
        {isAvatarVisible && (
          <div className="msg-avatar">
            <img src={pinacLogo} alt="AI Avatar" />
          </div>
        )}
        <div className="msg-content">
          <div className="msg-name">PINAC</div>
          <div className="msg-text ai-msg">{props.response}</div>
        </div>
      </div>
      <EmailComposeBox emailSubject={props.subject} emailBody={props.body} />
    </>
  )
}

type ScheduleMessageProps = {
  schedule: {
    id: number;
    title: string;
    start: string | Date;
    end: string | Date | undefined;
    type: "event" | "task"
  }[]
}

export const ScheduleMessage: React.FC<ScheduleMessageProps> = (props) => {
  return (
    <ScheduleViewer events={props.schedule} />
  )
}
