import {useState, useEffect} from 'react';
import Loading from './1-loading';
import Application from './2-application';
import './0-app.css';
import { getQueryString } from 'browser-helpers/build/read-window';
import { scrollToTop } from 'browser-helpers/build/scroll';

const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

function App() {

	// @@@@@@@@@@@ STATE @@@@@@@@@@@

	const [vpApp, setVPApp] = useState({vp_app_status: 0});
	const [hasLoaded, setHasLoaded] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [submitVPAppAttempted, setSubmitVPAppAttempted] = useState(false);
	const [vpAppValidationKeys, setVPAppValidationKeys] = useState({});

	const [vpAppStatusHash, setVPAppStatusHash] = useState({});

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
				console.log(r)
				const newA = r || {};
				if(!newA.vp_app_status){
					newA.vp_app_status = 0;
				}
				setVPApp(newA);
				setVPAppStatusHash(newA.vpAppStatusHash); // in the main app, this pre-loads
				setIsLoading(false);
			})
			.catch(err=>{
				console.error(err);
			});
			setHasLoaded(true);
		}
	}, [hasLoaded, appId]);

	// @@@@@@@@@@@ LOGIC @@@@@@@@@@@


	const handleVPAppChange = (k, v) => {

		const vp_app_status = vpApp.vp_app_status || 1;
		const vpAppStatusInHash = vpAppStatusHash[`${vp_app_status}`] || {};
		const isEditable = vpAppStatusInHash.editable;

		if(isEditable){
			const newA = JSON.parse(JSON.stringify(vpApp));
			newA[k] = v;
			setVPApp(newA);
		}
	};

	const validateVPApp = () => {
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
				if(!vpApp[k]){
					keys[k]=false;
					isComplete = false;
				}
			} else {
				if(vpApp[k] !== keys[k]){
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

	const saveVPApp = () => {
		const {
			isComplete,
			keys,
		} = validateVPApp();
		setVPAppValidationKeys(keys);
		setSubmitVPAppAttempted(true);
		if(!isComplete){
			return;
		}

		setIsLoading(true);
		const init = {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(vpApp),
		};
		fetch(`${REACT_APP_API_URL}api/open/`, init)
			.then(res=>{
				return res.json();
			})
			.then(r=>{
				setVPApp(r);

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
				vpApp={vpApp}
				handleVPAppChange={handleVPAppChange}
				setIsLoading={setIsLoading}
				saveVPApp={saveVPApp}
				vpAppValidationKeys={vpAppValidationKeys}
				submitVPAppAttempted={submitVPAppAttempted}
				vpAppStatusHash={vpAppStatusHash}
				internalWidget={null}
			/>
			{
				isLoading ? <Loading/> : null
			}
  </div>
}

export default App;
