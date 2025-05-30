import { useQueries, useQuery } from "@tanstack/react-query";
import { Itinerary, ItineraryDetail, listItineraries, listItineraryDetails } from "../../services/itineraryService";
import { useState } from "react";

export function useItinerary() {
  const { data: response, status: status } = useQuery({
    queryKey: ['itineraries'],
    queryFn: listItineraries,
    staleTime: 0,
    refetchOnMount: true,
  });

  return { response, status };
}

export function useItineraryDetail(parentId: number) {
  const { data: response, status: status } = useQuery({
    queryKey: ['itineraries_detail', parentId],
    queryFn: () => listItineraryDetails(parentId),
    staleTime: 0,
    refetchOnMount: true,
  });

  return { response, status };
}
