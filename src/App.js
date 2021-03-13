import './App.css';
import { Container, IconButton, Typography } from '@material-ui/core';
import Navbar from './components/Navbar/Navbar';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ChatBot from 'react-simple-chatbot';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ScrollToTop from 'react-scroll-up';
const validData = [{ name: "Nanthakumar J J", district: "Madurai", mobile: "8695255075", id: 'ZBK2034635' }];
const voterIds = validData.map((item) => (item.id))
const initialState = { voterid: '', mobile: '', password: '', confirmpass: '', otp: '' };
const ErrorState = { mobile: { bool: false, text: '' }, otp: { bool: false, text: '' }, password: { bool: false, text: '' }, confirmpass: { bool: false, text: '' }, voterid: { bool: false, text: '' } }

function App() {
  const [verified, setVerification] = useState(false);
  const [Sign, setSign] = useState(true);
  const [formData, setFormdata] = useState(initialState);
  const [errors, setErrors] = useState(ErrorState);
  const [log, setLog] = useState(false);
  const user = JSON.parse(localStorage.getItem('profile'))
  const switchMode = () => {
    setFormdata(initialState);
    let elem = document.getElementById('email_test');
    if (elem !== null) {
      elem.focus();
    }
    setErrors(ErrorState)
    setSign(!Sign);
  };

  return (

    <Router>
      <Container maxWidth="lg">
        <Navbar Sign={Sign} setSign={setSign} switchMode={switchMode} log={log} setLog={setLog} />
        <Switch>
          <Route path="/" exact>
            {!log && <ChatBot
              floating={true}
              headerTitle="Nandy's Bot"
              recognitionEnable={true}
              userAvatar={user?.result?.imageUrl || user?.result?.picture?.data?.url || user?.result?.avatar_url}
              steps={[
                {
                  id: '1',
                  message: 'What is your name?',
                  trigger: '2',
                },
                {
                  id: '2',
                  user: true,
                  trigger: '3',
                },
                {
                  id: '3',
                  message: 'Hi {previousValue}, nice to meet you!',
                  trigger: '4'

                },
                {
                  id: '4',
                  messsage: "Are you?",
                  options: [
                    { value: 2, label: 'Student', trigger: '5' },
                    { value: 3, label: 'Software Developer', trigger: '5' },
                  ],
                },
                {
                  id: '5',
                  options: [
                    { value: 1, label: 'Python', trigger: '6' },
                    { value: 2, label: 'C++', trigger: '6' },
                    { value: 3, label: 'C#', trigger: '6' },
                    { value: 4, label: 'Java Script', trigger: '6' },
                    { value: 5, label: 'Java', trigger: '6' },
                    { value: 6, label: 'Go', trigger: '6' },
                  ],
                },
                {
                  id: '6',
                  options: [
                    { value: 1, label: 'yes', trigger: '7' },
                    { value: 1, label: 'No', trigger: '8' }
                  ]
                },
                {
                  id: '7',
                  message: "Thanks for chatting with Nandy :)",
                  end: true
                },
                {
                  id: '8',
                  message: "Thanks for chatting with Nandy :)",
                  end: true
                }
              ]}
            />}

            <Home log={log} setLog={setLog} />

          </Route>
          <Route path="/auth" exact><Auth voterIds={voterIds} verified={verified} setVerification={setVerification} Sign={Sign} formData={formData} errors={errors} setLog={setLog} switchMode={switchMode} setErrors={setErrors} setFormdata={setFormdata} initialState={initialState} ErrorState={ErrorState} setSign={setSign} /></Route>
        </Switch>

      </Container>

      <ToastContainer closeOnClick />
      {/* <Fab color="primary" aria-label="add" className={classes.fab} onClick={handleScrolls} id="fab">
        <IconButton className="up">
          <ArrowDownwardIcon fontSize="large" />
        </IconButton>
      </Fab> */}
      <ScrollToTop showUnder={160} style={{
        bottom: 100,
        right: 35,
      }}>
        <IconButton className="up">
          <ArrowUpwardIcon fontSize="large" />
        </IconButton>
      </ScrollToTop>
    </Router>

  );
}

export default App;
