import React from 'react';
import './project.sass';
import { Button, Link } from './button';
export default function Project({
	name,
	picture,
	short,
	tags,
	code,
	site,
	demo,
}) {
	const [show] = React.useState(false);
	return (
		<article className="project">
			<img className="project__image" src={picture} alt=""></img>
			<div className="project__image__overlay"></div>
			<div className={`project__content ${show ? 'expand' : ''}`}>
				<h4>{name}</h4>
				<h5>
					{tags?.map((tag, key) => (
						<span key={key}>&#91;{tag}&#93; </span>
					))}
				</h5>
				<p>{short}</p>
				<div className="project__content__links">
					{code && <Link icon="fa-solid fa-code" text="Code" link={code} />}
					{site && (
						<Link icon="fa-solid fa-globe" text="Visit Site" link={site} />
					)}
					{!demo && !site && !code && (
						<Button
							icon="fa-solid fa-face-sad-tear"
							text="Sorry, no links at the moment!"></Button>
					)}
				</div>
			</div>
		</article>
	);
}
