/**
 * We use shorter names to reduce the final bundle size
 *
 * Properties:
 * @u = url
 * @t = title
 * @d = description
 * @q = quote
 * @h = hashtags
 * @tu = twitterUser
 * @i = image
 */

export default {
    facebook: 'https://www.facebook.com/sharer/sharer.php?u=@u',
    linkedin: 'https://www.linkedin.com/feed/?shareActive=true&text=@t%0A%0A@u',
    twitter: 'https://twitter.com/intent/tweet?url=@u&text=@t&via=@tu&hashtags=@h'
}