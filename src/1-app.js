import {useState, useEffect} from 'react';
import Loading from './1-loading';
import Application from './2-application';
import './0-app.css';
import { getQueryString } from 'browser-helpers/build/read-window';
import { scrollToTop } from 'browser-helpers/build/scroll';

const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

function App() {

	// @@@@@@@@@@@ STATE @@@@@@@@@@@

	const [application, setApplication] = useState({});
	const [hasLoaded, setHasLoaded] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [submitAttempted, setSubmitAttempted] = useState(false);
	const [validationKeys, setValidationKeys] = useState({});

	const queryString = getQueryString();

	const appIdArr = queryString.split('=');
	const appId = typeof appIdArr[1] === 'string' ? appIdArr[1] : queryString;
 
	useEffect(()=>{
		if(!hasLoaded){
		const init = {
			method: 'GET',
		};
		fetch(`${REACT_APP_API_URL}api/open/${appId}`, init)
			.then(res=>{
				return res.json();
			})
			.then(r=>{
				const newA = r || {};
				setApplication(newA);
				setIsLoading(false);
			})
			.catch(err=>{
				console.error(err);
			});
			setHasLoaded(true);
		}
	}, [hasLoaded, appId]);

	// @@@@@@@@@@@ LOGIC @@@@@@@@@@@

	const vp_app_status = application.vp_app_status || 1;
	const vpAppStatusHash = application.vpAppStatusHash || {};
	const vpAppStatusInHash = vpAppStatusHash[`${vp_app_status}`] || {};
	const isEditable = vpAppStatusInHash.editable;

	const handleVpChange = (k, v) => {
		if(isEditable){
			const newA = JSON.parse(JSON.stringify(application));
			newA[k] = v;
			setApplication(newA);
		}
	};

	const validateForm = () => {
		const keys = {
			vp_name_business: true,
			vp_type: true,
			vp_contact_person: true,
			vp_phone: true,
			vp_email: true,
			vp_area: true,
			vp_agree: 'Yes',
			vp_ref1: true,
			vp_ref2: true,
			vp_ref3: true,
		};
		let isComplete = true;
		for(let k in keys){
			if(keys[k]===true){
				if(!application[k]){
					keys[k]=false;
					isComplete = false;
				}
			} else {
				if(application[k] !== keys[k]){
					keys[k] = false;
					isComplete = false;
				}
			}
		}
		return {
			isComplete,
			keys,
		};
	};

	const saveApplication = () => {
		const {
			isComplete,
			keys,
		} = validateForm();
		setValidationKeys(keys);
		setSubmitAttempted(true);
		if(!isComplete){
			return;
		}

		setIsLoading(true);
		const init = {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(application),
		};
		fetch(`${REACT_APP_API_URL}api/open/`, init)
			.then(res=>{
				return res.json();
			})
			.then(r=>{
				setApplication(r);

				if(typeof window !== 'undefined' && window.location){
					const searchParams = new URLSearchParams(window.location.search);
					searchParams.set('app', r.vp_temp_id);
					window.location.search = searchParams.toString();
				}
				scrollToTop();
				setIsLoading(false);
			})
			.catch(err=>{
				console.error(err);
			});
	};

	// @@@@@@@@@@@ RENDER @@@@@@@@@@@

  return <div className="App">
			<Application
				application={application}
				handleVpChange={handleVpChange}
				setIsLoading={setIsLoading}
				saveApplication={saveApplication}
				validationKeys={validationKeys}
				submitAttempted={submitAttempted}
			/>
			{
				isLoading ? <Loading/> : null
			}
  </div>
}

export default App;
