import React from 'react';

const Sharing = ({pageContext, post}) => {
  
  const baseURL = 'https://kamranali.in/'

  return (
    <>
      <h3 className="text-center">
        Share this Post
      </h3>
      <div className="text-center social-share-links">
        <ul>
          <li><a href={'http://www.facebook.com/sharer/sharer.php?u=' + baseURL + pageContext.slug} className="facebook" target="_blank" rel="noopener noreferrer"><i className="fa fa-facebook fa-2x"></i></a></li>
          <li><a href={'http://twitter.com/share/?url=' + baseURL + pageContext.slug + '&text=' + post.title + '&via=aTechGuide'} className="twitter" target="_blank" rel="noopener noreferrer"><i className="fa fa-twitter fa-2x"></i></a></li>
        </ul>
      </div>
    </>
  );
}

export default Sharing;