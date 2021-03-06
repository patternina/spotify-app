import { useEffect, useState } from 'react'

import { getCurrentUserPlaylists } from '../spotify'
import { catchErrors } from '../utils'

import { Loader, PlaylistsGrid, Section } from '../components'

export const Playlists = () => {
  const [playlists, setPlaylists] = useState(null)

  useEffect(() => {
    const fetchPlaylistsData = async () => {
      const { data: playlistsData } = await getCurrentUserPlaylists()

      setPlaylists(playlistsData)
    }

    catchErrors(fetchPlaylistsData())
  }, [])

  return (
    <Section title="Top playlists" breadcrumb={true} isAltSection={true}>
      {playlists && playlists.items ? (
        <PlaylistsGrid playlists={playlists.items} />
      ) : (
        <Loader />
      )}
    </Section>
  )
}
