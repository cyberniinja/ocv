import React, { useState, useCallback } from 'react';
import './contact.sass';
import { Button, Link } from '../components/button';
import axios from 'axios';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

function Contact() {
	const { executeRecaptcha } = useGoogleReCaptcha();
	const [isSending, setIsSending] = useState(false);
	const [isSent, setIsSent] = useState(false);
	const [isError, setIsError] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [inputs, setInputs] = useState({
		email: '',
		subject: '',
		message: '',
	});
	const handleInputChange = (event) => {
		event.persist();
		setInputs((inputs) => ({
			...inputs,
			[event.target.name]: event.target.value,
		}));
	};

	// Create an event handler so you can call the verification on button click event or form submit
	const submitDataAsync = useCallback(async () => {
		setIsSending(true);

		if (!executeRecaptcha) {
			setErrorMessage('Recaptcha has not been loaded');
			setIsError(true);
			setTimeout(() => {
				setIsError(false);
			}, 3000);
			return;
		}
		// Get the recaptcha token
		const token = await executeRecaptcha('yourAction');

		// Make the request as usual
		try {
			const result = await axios({
				method: 'POST',
				url: 'https://formbold.com/s/9BvwL',
				data: {
					...inputs,
					'g-recaptcha-response': token,
				},
			});
			// Handle the result
			if (result.status === 201) {
				console.log('success', result);
				setIsSending(false);
				setIsSent(true);
				setTimeout(() => {
					setIsSent(false);
				}, 3000);
			} else {
				console.log('fail', result);
				setIsSending(false);
				setIsError(true);
				setErrorMessage(`Something went wrong! Please try again later.`);
				setTimeout(() => {
					setIsError(false);
				}, 3000);
			}
		} catch (error) {
			console.log(error);
			setIsSending(false);
			setIsError(true);
			setErrorMessage(`Something went wrong! Please try again later.`);
			setTimeout(() => {
				setIsError(false);
			}, 3000);
		}
	}, [executeRecaptcha, inputs, setIsError, setErrorMessage]);

	const handleOnSubmit = (event) => {
		event.preventDefault();
		submitDataAsync();
	};

	return (
		<section className="contact primary">
			<div className="container">
				<div className="heading">
					<h3>Contact Me</h3>
					<p>Let's get in touch!</p>
				</div>
				{isError && <div className="error">{errorMessage}</div>}
				<div className="contact__content gutter">
					<form onSubmit={handleOnSubmit}>
						<input
							required
							onChange={handleInputChange}
							value={inputs.email}
							id="email"
							type="email"
							name="email"
							placeholder="Email (you@example.com)"
						/>
						<input
							required
							onChange={handleInputChange}
							value={inputs.subject}
							id="subject"
							type="text"
							name="subject"
							placeholder="Subject (e.g. Job Offer)"
						/>
						<textarea
							required
							onChange={handleInputChange}
							value={inputs.message}
							rows={10}
							id="message"
							name="message"
							placeholder="Message (e.g. Hi, I would like to hire you for a job...)"
						/>
						{isSending && (
							<Button icon="fa-solid fa-spinner fa-spin" text="Sending..." />
						)}
						{isSent && <Button icon="fa-solid fa-check" text="Sent!" />}
						{isError && <Button icon="fa-solid fa-times" text="Error!" />}
						{!isError && !isSending && !isSent && (
							<Button icon="fa-solid fa-paper-plane" text="Send" />
						)}
					</form>
				</div>
				<p className="small">
					This site is protected by reCAPTCHA and the Google{' '}
					<Link
						className="btn__inline"
						link="https://policies.google.com/privacy"
						text="Privacy Policy"
					/>{' '}
					and{' '}
					<Link
						className={'btn__inline'}
						link="https://policies.google.com/terms"
						text="Terms of Service"></Link>{' '}
					apply.
				</p>
			</div>
		</section>
	);
}

export default Contact;
