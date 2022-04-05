import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

const Contact = ({ main }) => {

   const { register, handleSubmit, watch, errors } = useForm();
   //const onSubmit = data => console.log(data);
   console.log(errors);
   console.log(watch("example"));

   const [profileState, setProfileState] = useState(main);

   useEffect(() => {
      setProfileState(main)
   },[main])

   if (profileState) {
      var name = profileState.name;
      var street = profileState.address.street;
      var city = profileState.address.city;
      var state = profileState.address.state;
      var zip = profileState.address.zip;
      var phone = profileState.phone;
      var email = profileState.email;
   }


   const onSubmit = data => {
      alert(JSON.stringify(data, null));
    };

   return (
      <section id="contact">
         <div className="row section-head">
            <div className="two columns header-col">
               <h1><span>Get In Touch.</span></h1>
            </div>
            <div className="ten columns">
               <p className="lead">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam,
               eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam
               voluptatem quia aut odit aut fugit.
                 </p>
            </div>
         </div>
         <div className="row">
            <div className="eight columns">
               <form id="contactForm" name="contactForm" onSubmit={handleSubmit(onSubmit)}>
                  <fieldset>
                     <div>
                        <label htmlFor="contactName">Name <span className="required">*</span></label>
                        <input type="text"  id="contactName" name="contactName" ref={register({required: true, maxLength: 80})}/>
                        {errors.contactName && <p>This field is required</p>}
                     </div>
                     <div>
                        <label htmlFor="contactEmail">Email <span className="required">*</span></label>
                        <input type="text"   id="contactEmail" name="contactEmail" ref={register({required: true, pattern: /^\S+@\S+$/i})} />
                        {errors.contactEmail && <p>This field is required</p>}
                     </div>
                     <div>
                        <label htmlFor="contactSubject">Subject</label>
                        <input type="text"   id="contactSubject" name="contactSubject" ref={register({required: true, maxLength: 100})}/>
                        {errors.contactSubject && <p>This field is required</p>}
                     </div>
                     <div>
                        <label htmlFor="contactMessage">Message <span className="required">*</span></label>
                        <textarea cols="50" rows="15" id="contactMessage" name="contactMessage" ref={register({required: true, maxLength: 100})}></textarea>
                        {errors.contactMessage && <p>This field is required</p>}
                     </div>
                     <div>
                        <button className="submit" type="submit">Submit</button>
                        <span id="image-loader">
                           <img alt="" src="images/loader.gif" />
                        </span>
                     </div>
                  </fieldset>
               </form>
               <div id="message-warning"> Error boy</div>
               <div id="message-success">
                  <i className="fa fa-check"></i>Your message was sent, thank you!<br />
               </div>
            </div>
            <aside className="four columns footer_novo-widgets">
               <div className="widget widget_contact">
                  <h4>Address and Phone</h4>
                  <p className="address">
                     {name}<br />
                     {street} <br />
                     {city}, {state} {zip}<br />
                     <span>{phone}</span>
                  </p>
               </div>
               <div className="widget widget_tweets">
                  <h4 className="widget-title">Latest Tweets</h4>
                  <ul id="twitter">
                     <li>
                        <span>
                           User experience iPhone pivot growth hacking technology focus low hanging
                      </span>
                     </li>
                     <li>
                        <span>
                           market learning curve release ecosystem fruit non-disclosure agreement branding .
                     </span>
                     </li>
                  </ul>
               </div>
            </aside>
         </div>

      </section>
   );
}


export default Contact;
