export default function Application(props) {

	const {
		application,
		handleVpChange,
		saveApplication,
		validationKeys,
		submitAttempted,
	} = props;

	const a = application || {};

	const vpAppStatusHash = a.vpAppStatusHash || {};
	const vp_app_status = a.vp_app_status || 1 ;
	const vpAppStatus = vpAppStatusHash[`${vp_app_status}`] || {};
	const vpAppEditable = vpAppStatus.editable;
	const vpAppStatusLabel = vpAppStatus.label || '';
	const vpAppStatusText = vpAppStatus.text || '';

	const vk = !submitAttempted ? {} : validationKeys;

	const asterisk = <span className='x'>*</span>
	return <div className='display-group'>

		<div className='top-banner'>
			<h1 className='h1'>Vendor Partner Intake Form</h1>
		</div>

		<p className='top-p'>Thank you for your interest in our Vendor Partner Program!</p>
		<p className='top-p'>If you have this link, we should have already talked about how the Vendor Partner Program works. If not, please call me at 703.731.4163.</p>
		<p className='top-p'>Please fill out the following information so that we can start referring clients your way and supporting you and your business! Really looking forward to it!</p>
		<p className='top-p'>Thanks! - Brad Garner</p>

		<div className='divider'/>

		<p className='top-p' style={{color:'#bbb'}}>Application Status: {vpAppStatusLabel}</p>
		<p className='top-p'>{vpAppStatusText}</p>
		<p>&nbsp;</p>

		<label className='edit-label'>
			Business Name
			<input className='edit-input edit-input-wide-nest'
				value={a.vp_name_business || ''}
				style={submitAttempted && !vk.vp_name_business ? {border: '1px solid red'} :{}}
				onChange={e=>handleVpChange('vp_name_business', e.target.value)}/>
		</label>

		<label className='edit-label'>
			What type of business are you? (plumber, roofer, electrician, restaurant, etc)
			<textarea className='edit-input edit-input-wide-nest'
				value={a.vp_type || ''}
				style={submitAttempted && !vk.vp_type ? {border: '1px solid red'} :{}}
				onChange={e=>handleVpChange('vp_type', e.target.value)}/>
		</label>

		<label className='edit-label'>
			Best Contact Person
			<input className='edit-input edit-input-wide-nest'
				value={a.vp_contact_person || ''}
				style={submitAttempted && !vk.vp_contact_person ? {border: '1px solid red'} :{}}
				onChange={e=>handleVpChange('vp_contact_person', e.target.value)}/>
		</label>

		<label className='edit-label'>
			Business Phone Number
			<input className='edit-input edit-input-wide-nest'
				value={a.vp_phone || ''}
				style={submitAttempted && !vk.vp_phone ? {border: '1px solid red'} :{}}
				onChange={e=>handleVpChange('vp_phone', e.target.value)}/>
		</label>

		<label className='edit-label'>
			Business Email
			<input className='edit-input edit-input-wide-nest'
				value={a.vp_email || ''}
				style={submitAttempted && !vk.vp_email ? {border: '1px solid red'} :{}}
				onChange={e=>handleVpChange('vp_email', e.target.value)}/>
		</label>

		<label className='edit-label'>
			Website
			<input className='edit-input edit-input-wide-nest'
				value={a.vp_url || ''}
				onChange={e=>handleVpChange('vp_url', e.target.value)}/>
		</label>

		<label className='edit-label'>
			What is your service area? We only want to refer you to customers in areas you service.	
			<textarea className='edit-input edit-textarea edit-input-wide-nest'
				value={a.vp_area || ''}
				style={submitAttempted && !vk.vp_area ? {border: '1px solid red'} :{}}
				onChange={e=>handleVpChange('vp_area', e.target.value)}/>
		</label>

		<label className='edit-label'>
			Best URL/link we can send our clients to leave you an online review (Google, Yelp, Facebook, etc.)
			<input className='edit-input edit-input-wide-nest'
				value={a.vp_review_url || ''}
				onChange={e=>handleVpChange('vp_review_url', e.target.value)}/>
		</label>

		<div className='divider'/>

		<p className='inline-p'>To be on our list of preferred Vendor Partners and start receiving quality customers from us, you must be 'personally vetted' by us. This requires a simple 2 minute phone call with 3 of your past customers so that we can ask a few questions and get a positive blurb about why they love working with you. We use these testimonials when we recommend you to our clients so they have faith in choosing you. Your references often feel flattered that you thought of them. Feel free to let them know we will be in touch.</p>
		<label className='edit-label'>
			Do you agree to provide three past customers so we can place that 2 minute call and maintain integrity for our list?
			<select className='edit-input edit-input-wide-nest'
				value={a.vp_agree || ''}
				style={submitAttempted && !vk.vp_agree ? {border: '1px solid red'} :{}}
				onChange={e=>handleVpChange('vp_agree', e.target.value)}>
					<option key={-1} value={' '}>{' '}</option>
					<option key={0} value={'Yes'}>{'Yes'}</option>
					<option key={1} value={'No'}>{'No'}</option>
			</select>
		</label>

		<label className='edit-label'>
			First Past Client We Can Contact For A Testimonial (Name & Phone Number)				
			<textarea className='edit-input edit-textarea edit-input-wide-nest'
				value={a.vp_ref1 || ''}
				style={submitAttempted && !vk.vp_ref1 ? {border: '1px solid red'} :{}}
				onChange={e=>handleVpChange('vp_ref1', e.target.value)}/>
		</label>

		<label className='edit-label'>
			Second Past Client We Can Contact For A Testimonial (Name & Phone Number)				
			<textarea className='edit-input edit-textarea edit-input-wide-nest'
				value={a.vp_ref2 || ''}
				style={submitAttempted && !vk.vp_ref2 ? {border: '1px solid red'} :{}}
				onChange={e=>handleVpChange('vp_ref2', e.target.value)}/>
		</label>

		<label className='edit-label'>
			Third Past Client We Can Contact For A Testimonial (Name & Phone Number)				
			<textarea className='edit-input edit-textarea edit-input-wide-nest'
				value={a.vp_ref3 || ''}
				style={submitAttempted && !vk.vp_ref3 ? {border: '1px solid red'} :{}}
				onChange={e=>handleVpChange('vp_ref3', e.target.value)}/>
		</label>
		
		{
			submitAttempted ?
			<p className="top-p" style={{color: 'red'}}>
				Please complete the fields outlined in red, then try again.
			</p> : null 
		}
		{
			vpAppEditable ?
				<div onClick={()=>saveApplication()} className='major-button'>
					<p className='major-button-text'>SUBMIT</p>
				</div> : null 
		}

	</div>
}