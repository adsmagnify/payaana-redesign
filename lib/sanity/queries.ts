import { client } from './client'

export async function getPackages() {
  try {
    const packages = await client.fetch(`
      *[_type == "package"] | order(_createdAt desc) {
        _id,
        title,
        slug,
        mainImage,
        price,
        duration,
        description,
        highlights,
        destination-> {
          _id,
          name,
          slug
        }
      }
    `)
    return packages || []
  } catch (error) {
    console.error('Error fetching packages:', error)
    return []
  }
}

export async function getPackageBySlug(slug: string) {
  try {
    const packageData = await client.fetch(
      `
      *[_type == "package" && slug.current == $slug][0] {
        _id,
        title,
        slug,
        mainImage,
        price,
        duration,
        description,
        highlights,
        itinerary[] {
          title,
          description
        },
        destination-> {
          _id,
          name,
          slug
        }
      }
    `,
      { slug }
    )
    return packageData || null
  } catch (error) {
    console.error('Error fetching package:', error)
    return null
  }
}

export async function getDestinations() {
  try {
    const destinations = await client.fetch(`
      *[_type == "destination"] | order(name asc) {
        _id,
        name,
        slug,
        mainImage,
        description,
        location
      }
    `)
    return destinations || []
  } catch (error) {
    console.error('Error fetching destinations:', error)
    return []
  }
}

export async function getDestinationBySlug(slug: string) {
  try {
    const destination = await client.fetch(
      `
      *[_type == "destination" && slug.current == $slug][0] {
        _id,
        name,
        slug,
        mainImage,
        description,
        location,
        "featuredPackages": *[_type == "package" && references(^._id)] {
          _id,
          title,
          slug,
          mainImage,
          price,
          duration
        }
      }
    `,
      { slug }
    )
    return destination || null
  } catch (error) {
    console.error('Error fetching destination:', error)
    return null
  }
}

