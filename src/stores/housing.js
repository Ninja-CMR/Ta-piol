import { defineStore } from 'pinia'

export const useHousingStore = defineStore('housing', {
    state: () => ({
        housings: [
            {
                id: 1,
                title: 'Chambre Moderne à Bonamoussadi',
                price: 35000,
                type: 'Chambre',
                city: 'Douala',
                neighborhood: 'Bonamoussadi',
                image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80',
                amenities: ['Eau 24/7', 'Gardien', 'Compteur individuel'],
                distance: '10 min de l\'IUT',
                description: 'Une belle chambre spacieuse avec douche interne, située dans un quartier calme et sécurisé.',
                isFavorite: false,
            },
            {
                id: 2,
                title: 'Studio Haut Standing Ngoa-Ekelle',
                price: 65000,
                type: 'Studio',
                city: 'Yaoundé',
                neighborhood: 'Ngoa-Ekelle',
                image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
                amenities: ['Eau 24/7', 'Climatisation', 'Cuisine interne'],
                distance: '5 min de l\'UY1',
                description: 'Studio moderne à proximité directe du campus. Idéal pour étudiant.',
                isFavorite: true,
            },
            {
                id: 3,
                title: 'Appartement spacieux Logbessou',
                price: 85000,
                type: 'Appartement',
                city: 'Douala',
                neighborhood: 'Logbessou',
                image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80',
                amenities: ['Gardien H24', 'Balcon', 'Parking'],
                distance: '15 min de l\'IUT',
                description: 'Appartement de type T2, moderne et bien aéré.',
                isFavorite: false,
            },
            {
                id: 4,
                title: 'Chambre Étudiante Soa',
                price: 25000,
                type: 'Chambre',
                city: 'Yaoundé',
                neighborhood: 'Soa',
                image: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=800&q=80',
                amenities: ['Eau 24/7', 'Proche Université'],
                distance: '2 min de l\'Université de Soa',
                description: 'Chambre simple et efficace pour étudiant à Soa.',
                isFavorite: false,
            },
            {
                id: 5,
                title: 'Studio Chic à Ange Raphaël',
                price: 55000,
                type: 'Studio',
                city: 'Douala',
                neighborhood: 'Ange Raphaël',
                image: 'https://images.unsplash.com/photo-1536376074432-8d630fa99fba?auto=format&fit=crop&w=800&q=80',
                amenities: ['Eau 24/7', 'Wifi', 'Sécurisé'],
                distance: '5 min de l\'IUT de Douala',
                description: 'Studio très bien situé pour les étudiants de l\'IUT. Calme et accès facile.',
                isFavorite: false,
            },
            {
                id: 6,
                title: 'Mini-Appartement Nkoabang',
                price: 75000,
                type: 'Appartement',
                city: 'Yaoundé',
                neighborhood: 'Nkoabang',
                image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=800&q=80',
                amenities: ['Parking', 'Gardien', 'Balcon'],
                distance: '20 min du centre ville',
                description: 'Appartement spacieux dans une zone calme.',
                isFavorite: false,
            },
            {
                id: 7,
                title: 'Chambre VIP Logbessou',
                price: 45000,
                type: 'Chambre',
                city: 'Douala',
                neighborhood: 'Logbessou',
                image: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80',
                amenities: ['Climatisation', 'Eau 24/7'],
                distance: '10 min de l\'IUT',
                description: 'Chambre avec finitions modernes, climatisée pour votre confort.',
                isFavorite: false,
            },
            {
                id: 8,
                title: 'Studio Étudiant Molyko Style',
                price: 40000,
                type: 'Studio',
                city: 'Yaoundé',
                neighborhood: 'Soa',
                image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800&q=80',
                amenities: ['Proche Université', 'Eau 24/7'],
                distance: '5 min de l\'Université de Soa',
                description: 'Parfait pour un étudiant cherchant la proximité et le calme.',
                isFavorite: false,
            },
            {
                id: 9,
                title: 'Appartement Meublé Bonamoussadi',
                price: 150000,
                type: 'Appartement',
                city: 'Douala',
                neighborhood: 'Bonamoussadi',
                image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80',
                amenities: ['Meublé', 'Climatisation', 'Wifi', 'Gardien'],
                distance: '15 min de l\'IUT',
                description: 'Appartement tout confort, prêt à habiter.',
                isFavorite: false,
            },
            {
                id: 10,
                title: 'Chambre Éco Ngoa-Ekelle',
                price: 20000,
                type: 'Chambre',
                city: 'Yaoundé',
                neighborhood: 'Ngoa-Ekelle',
                image: 'https://images.unsplash.com/photo-1556216724-463fb7212455?auto=format&fit=crop&w=800&q=80',
                amenities: ['Prix bas', 'Près du campus'],
                distance: '2 min de l\'UY1',
                description: 'Idéal pour petit budget, à deux pas des amphis.',
                isFavorite: false,
            },
            {
                id: 11,
                title: 'Studio Moderne Biyem-Assi',
                price: 60000,
                type: 'Studio',
                city: 'Yaoundé',
                neighborhood: 'Ngoa-Ekelle',
                image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
                amenities: ['Cuisine interne', 'Compteur personnel', 'Eau 24/7'],
                distance: '10 min du campus',
                description: 'Excellent rapport qualité/prix dans un quartier animé.',
                isFavorite: false,
            },
            {
                id: 12,
                title: 'Studio Modernisé PK10',
                price: 50000,
                type: 'Studio',
                city: 'Douala',
                neighborhood: 'Logbessou',
                image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80',
                amenities: ['Eau 24/7', 'Sécurisé'],
                distance: '5 min de l\'IUT',
                description: 'Proche des écoles, environnement propice aux études.',
                isFavorite: false,
            }
        ],
        currentHousing: null,
        filters: {
            search: '',
            type: 'Toutes les offres',
            maxPrice: null,
            city: null,
        },
        appointments: [],
    }),
    getters: {
        filteredHousings: (state) => {
            return state.housings.filter(h => {
                const matchesSearch = state.filters.search ? (h.title.toLowerCase().includes(state.filters.search.toLowerCase()) || h.neighborhood.toLowerCase().includes(state.filters.search.toLowerCase())) : true
                const matchesType = state.filters.type === 'Toutes les offres' ? true : h.type === state.filters.type
                const matchesPrice = state.filters.maxPrice ? h.price <= state.filters.maxPrice : true
                const matchesCity = state.filters.city ? h.city === state.filters.city : true
                return matchesSearch && matchesType && matchesPrice && matchesCity
            })
        },
        favoritedHousings: (state) => state.housings.filter(h => h.isFavorite),
    },
    actions: {
        setFilter(key, value) {
            this.filters[key] = value
        },
        toggleFavorite(id) {
            const housing = this.housings.find(h => h.id === id)
            if (housing) housing.isFavorite = !housing.isFavorite
        },
        fetchHousingById(id) {
            this.currentHousing = this.housings.find(h => h.id === parseInt(id)) || null
        },
        addAppointment(appointment) {
            this.appointments.push({
                id: Date.now(),
                status: 'En attente',
                ...appointment
            })
        }
    },
    persist: true,
})
