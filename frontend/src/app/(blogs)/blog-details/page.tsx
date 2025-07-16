import Link from "next/link";
import { IMAGES } from "@/constant/theme";
import Footer from "@/layout/Footer";
import Header from "@/layout/Header";
import Sidebar from "@/component/Sidebar";
import Image from "next/image";
import CommentForm from "./_components/CommentForm";

function BlogDetail() {
   
    return (
        <>
            <Header />
            <main className="page-content">
                <div className="section-full post-header blog-single style-1 mb-0">
                    <div className="dz-card text-center">
                        <div className="dz-media overlay-secondary-light">
                            <Image src={IMAGES.blog1} alt="" />
                        </div>
                        <div className="dz-info">
                            <h1 className="dz-title text-white mx-auto">The Skincare Routine That Works Expert Tips for Every Skin Type</h1>
                            <div className="dz-meta style-1">
                                <ul className="justify-content-center">
                                    <li className="post-date">17 May 2025</li>
                                    <li className="dz-user">
                                        <i className="fa-solid fa-user" />
                                        By <Link href={"#"} scroll={false}>KK Sharma</Link>
                                    </li>
                                    <li className="dz-comment">
                                        <i className="fa-solid fa-message" />
                                        <Link href={"#"} scroll={false}>24 Comments</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <section className="content-inner-3">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-9 pe-xl-5 m-b30">
                                <div className="dz-blog blog-single sidebar style-1">
                                    <div className="dz-info">
                                        <div className="dz-post-text">
                                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                                            <blockquote className="wp-block-quote is-style-default">
                                                <p>Unlocking the Secrets of Sustainable Fashion: Eco-Friendly Choices for a Stylish and Responsible Wardrobe</p>
                                                <cite>Ronald M. Spino</cite>
                                                <i className="flaticon-right-quote" />
                                            </blockquote>
                                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including.</p>
                                            <figure className="wp-container-5 wp-block-gallery-3 wp-block-gallery has-nested-images columns-3 is-cropped alignwide">
                                                <figure className="wp-block-image size-large"><Image src={IMAGES.blogmiddle1} alt="/" /></figure>
                                                <figure className="wp-block-image size-large"><Image src={IMAGES.blogmiddle2} alt="/" /></figure>
                                            </figure>
                                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including.</p>
                                            <h3 className="dz-title">Additional information</h3>
                                            <p>It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
                                        </div>
                                        <div className="dz-share-post meta-bottom">
                                            <div className="post-tags">
                                                <strong>Tags:</strong>
                                                <Link href={"#"} scroll={false}>Blood</Link>
                                                <Link href={"#"} scroll={false}>Food</Link>
                                                <Link href={"#"} scroll={false}>Health</Link>
                                                <Link href={"#"} scroll={false}>Therapy</Link>
                                                <Link href={"#"} scroll={false}>Walking</Link>
                                            </div>
                                            <div className="dz-social-icon primary-light">
                                                <ul>
                                                    <li><Link href="https://www.facebook.com/dexignzone" target="_blank"><i className="fa-brands fa-facebook-f" /></Link></li>
                                                    <li><Link href="https://www.instagram.com/dexignzone" target="_blank"><i className="fa-brands fa-instagram" /></Link></li>
                                                    <li><Link href="https://x.com/dexignzone" target="_blank"><i className="fa-brands fa-x-twitter" /></Link></li>
                                                    <li><Link href="https://www.linkedin.com/showcase/dexignzone" target="_blank"><i className="fa-brands fa-linkedin" /></Link></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="clear" id="comment-list">
                                    <div className="post-comments comments-area style-1 clearfix">
                                        <h4 className="comments-title mb-2">Comments (02)</h4>
                                        <p className="dz-title-text">There are many variations of passages of Lorem Ipsum available.</p>
                                        <div id="comment">
                                            <ol className="comment-list">
                                                <li className="comment even thread-even depth-1 comment" id="comment-2">
                                                    <div className="comment-body">
                                                        <div className="comment-author vcard">
                                                            <Image src={IMAGES.avtarmiddle1} alt="/" className="avatar" />
                                                            <cite className="fn">Michel Poe</cite>
                                                        </div>
                                                        <div className="comment-content dz-page-text">
                                                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                                                        </div>
                                                        <div className="reply">
                                                            <Link rel="nofollow" className="comment-reply-link" href={"#"}>Reply</Link>
                                                        </div>
                                                    </div>
                                                    <ol className="children">
                                                        <li className="comment byuser comment-author-w3itexpertsuser bypostauthor odd alt depth-2 comment" id="comment-3">
                                                            <div className="comment-body" id="div-comment-3">
                                                                <div className="comment-author vcard">
                                                                    <Image src={IMAGES.avtarmiddle2} alt="/" className="avatar" />
                                                                    <cite className="fn">Celesto Anderson</cite>
                                                                </div>
                                                                <div className="comment-content dz-page-text">
                                                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                                                                </div>
                                                                <div className="reply">
                                                                    <Link className="comment-reply-link" href={"#"}> Reply</Link>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    </ol>
                                                </li>
                                                <li className="comment even thread-odd thread-alt depth-1 comment" id="comment-4">
                                                    <div className="comment-body" id="div-comment-4">
                                                        <div className="comment-author vcard">
                                                            <Image src={IMAGES.avtarmiddle1} alt="/" className="avatar" />
                                                            <cite className="fn">Monsur Rahman Lito</cite>
                                                        </div>
                                                        <div className="comment-content dz-page-text">
                                                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                                                        </div>
                                                        <div className="reply">
                                                            <Link className="comment-reply-link" href={"#"}> Reply</Link>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ol>
                                        </div>
                                        <div className="default-form comment-respond style-1" id="respond">
                                            <h4 className="comment-reply-title mb-2" id="reply-title">Good Comments</h4>
                                            <p className="dz-title-text">There are many variations of passages of Lorem Ipsum available.</p>
                                            <div className="clearfix">
                                                <CommentForm />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3">
                                <Sidebar />
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
export default BlogDetail;