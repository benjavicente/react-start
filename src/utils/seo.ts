export const seo = ({
	title,
	description,
	keywords,
	image,
	url,
}: {
	title: string
	description?: string
	image?: string
	keywords?: string
	url?: string
}) => {
	const tags = [
		{ name: 'og:type', content: 'website' },
		...(keywords ? [{ name: 'keywords', content: keywords }] : []),
		...(title
			? [
					{ title },
					{ name: 'twitter:title', content: title },
					{ name: 'og:title', content: title },
				]
			: []),
		...(description
			? [
					{ name: 'description', content: description },
					{ name: 'twitter:description', content: description },
					{ name: 'og:description', content: description },
				]
			: []),
		...(url ? [{ name: 'og:url', content: url }] : []),
		...(image
			? [
					{ name: 'twitter:image', content: image },
					{ name: 'twitter:card', content: 'summary_large_image' },
					{ name: 'og:image', content: image },
				]
			: []),
	]

	return tags
}
