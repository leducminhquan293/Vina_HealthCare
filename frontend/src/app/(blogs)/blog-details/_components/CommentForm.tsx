"use client"
import { useEmailService } from '@/constant/useEmailService';
import { useRef } from "react";

const CommentForm = () =>{
    const form = useRef<HTMLFormElement | null>(null);
    const { sendEmail } = useEmailService();
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!form.current) return;
        const result = await sendEmail(form.current);
        if (result.success) {
            console.log('SUCCESS!', result.message);
        } else {
            console.error('FAILED...', result.message);
        }
    };
    return(
        <form ref={form} onSubmit={handleSubmit} method="post" id="comments_form" className="comment-form" noValidate>
            <p className="comment-form-author">
                <input id="name" placeholder="Author" name="author" type="text" />
            </p>
            <p className="comment-form-email">
                <input id="email" required placeholder="Email" name="email" type="email" />
            </p>
            <p className="comment-form-comment">
                <textarea id="comments" placeholder="Type Comment Here" className="form-control4" name="comment" 
                    cols={45} rows={3} required></textarea>
            </p>
            <p className="col-md-12 col-sm-12 col-xs-12 form-submit">
                <button id="submit" type="submit" className="submit btn btn-primary btn-lg filled">Submit Now</button>
            </p>
        </form>
    )
}
export default CommentForm;
