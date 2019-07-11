import cx from 'classnames';
import {ReactComponent as HomeIcon} from './assets/icons/home.svg';
import React from 'react';
import styles from './styles.css';

const Icons = () => {
	return <span className={cx(styles.icon, 'svg')} >
		<HomeIcon />
	</span>
}

export default Icons;
