import { COORDINATES_LIST_BY_TYPE } from "../../subdomains/shared/constants/coordinates"

interface ItemProps {
  longitude: number
  latitude: number
}

interface CoordinatesProps {
  minlon: number
  maxlon: number
  minlat: number
  maxlat: number
}

interface ItemsToFilterProps {
  location: {
    coordinates: {
      longitude: number
      latitude: number
    }
  }
}

function checkItemInCoordinatesList(item: ItemProps, coordinates: CoordinatesProps[]) {
  const longitude = coordinates.some(coordinate => item.longitude >= coordinate.minlon && item.longitude <= coordinate.maxlon)
  const latitude = coordinates.some(coordinate => item.latitude >= coordinate.minlat && item.latitude <= coordinate.maxlat)

  return longitude && latitude
}

const ItemInCoordinatesList = {
  normal: (item: ItemsToFilterProps) => {
    return checkItemInCoordinatesList(item.location.coordinates, COORDINATES_LIST_BY_TYPE["normal"])
  },
  especial: (item: ItemsToFilterProps) => {
    return checkItemInCoordinatesList(item.location.coordinates, COORDINATES_LIST_BY_TYPE["especial"])
  }
}

export function filterCustomersList(items: ItemsToFilterProps[], filter: FilterType) {
  return items.filter((item, idx) => {
    if (filter !== 'trabalhoso') {
      return ItemInCoordinatesList[filter](item)
    }

    if (filter === 'trabalhoso') {
      const normals = !checkItemInCoordinatesList(item.location.coordinates, COORDINATES_LIST_BY_TYPE["normal"])
      const specials = !checkItemInCoordinatesList(item.location.coordinates, COORDINATES_LIST_BY_TYPE["especial"])

      return normals && specials
    }

    return item
  })
}

// melhorar
export function filterByEmail(list: any[], email: string) {
  return list.find(item => item.email === email)
}
