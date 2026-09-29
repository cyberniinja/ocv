import React from 'react';
import './button.sass';

function Button({ text, children, className, onClick, icon, ...rest }) {
	return (
		<button
			onClick={onClick}
			className={`btn${className ? ' ' + className : ''}`}
			{...rest}>
			{(children || icon) && (
				<span className="btn__icon__container">
					{icon ? <i className={icon}></i> : ''}
					{children ?? ''}
				</span>
			)}
			{text ? <span className="btn__text__container">{text}</span> : ''}
		</button>
	);
}

function Link({ text, children, className, link, icon, ...rest }) {
	return (
		<a
			href={link}
			className={`btn${className ? ' ' + className : ''}`}
			{...rest}>
			{(children || icon) && (
				<span className="btn__icon__container">
					{icon ? <i className={icon}></i> : ''}
					{children ?? ''}
				</span>
			)}
			{text ? <span className="btn__text__container">{text}</span> : ''}
		</a>
	);
}

export { Link, Button };
