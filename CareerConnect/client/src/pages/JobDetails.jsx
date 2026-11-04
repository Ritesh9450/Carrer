import { useEffect,useState } from 'react';
import { useParams,Link,useNavigate } from 'react-router-dom';
import { MapPin, Briefcase, CalendarDays, ArrowLeft } from 'lucide-react';
import api from '../api'; import {useAuth} from '../context/AuthContext';
export default function JobDetails(){
 const {id}=useParams(),[job,setJob]=useState(null),[coverLetter,setCoverLetter]=useState(''),[message,setMessage]=useState(''),[busy,setBusy]=useState(false);
 const {user}=useAuth(),nav=useNavigate();
 useEffect(()=>{api.get(`/jobs/${id}`).then(r=>setJob(r.data.job)).catch(e=>setMessage(e.response?.data?.message||'Could not load listing'));},[id]);
 const apply=async()=>{if(!user){nav('/login');return;}setBusy(true);setMessage('');try{await api.post(`/jobs/${id}/apply`,{coverLetter});setMessage('Application submitted successfully. Track it in My applications.');}catch(e){setMessage(e.response?.data?.message||'Could not submit application');}finally{setBusy(false);}};
 if(!job)return <div className="center-page">{message||'Loading opportunity…'}</div>;
 return <section className="detail-wrap"><Link to="/" className="back-link"><ArrowLeft size={16}/> Back to opportunities</Link><article className="detail-card"><span className={`tag ${job.type}`}>{job.type}</span><h1>{job.title}</h1><h3>{job.company}</h3><div className="detail-meta"><span><MapPin/>{job.location}</span><span><Briefcase/>{job.workMode}</span><span><CalendarDays/>{job.experience}</span></div><div className="detail-salary">{job.salary||'Compensation not specified'}</div><h2>About the opportunity</h2><p className="preserve">{job.description}</p><h2>Skills</h2><div className="skill-list">{(job.skills||[]).map(s=><span key={s}>{s}</span>)}</div>{job.deadline&&<p className="muted">Apply by: {new Date(job.deadline).toLocaleDateString()}</p>}{user?.role==='student'&&<div className="apply-box"><h2>Apply for this opportunity</h2><label className="field">Cover letter (optional)<textarea rows="4" value={coverLetter} onChange={e=>setCoverLetter(e.target.value)} placeholder="Tell the recruiter why you're a good fit…"/></label><button className="btn btn-primary" onClick={apply} disabled={busy}>{busy?'Submitting…':'Submit application'}</button></div>}{!user&&<Link to="/login" className="btn btn-primary">Log in to apply</Link>}{message&&<div className="alert success">{message}</div>}</article></section>;
}
