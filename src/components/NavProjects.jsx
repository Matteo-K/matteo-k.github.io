import { useData } from '../hooks/useData';
import { DataStatut } from '../enums/DataStatut';

import { Navigation, Pagination, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function NavProjects(props) {
  const { isLoading, error, getProjects } = useData();
    
  if (isLoading) return <div>🔄 Chargement...</div>;
  if (error) return <div>❌ Erreur: {error}</div>;
  const projects = getProjects({
    where: { statut: DataStatut.ACTIF },
    order: { priority: 1}
  });

  const setSlide = (project) => {
    props.setProject(project);
  };
  return (
    <nav>
      <Swiper
        modules={[Navigation, Pagination, A11y]}
        spaceBetween={50}
        slidesPerView={3}
        navigation
        pagination={{ clickable: true }}
        onSlideChange={(swiper) => setSlide(projects[swiper.activeIndex])}
      >
        <SwiperSlide key={0}>
          {({ isActive }) => (
            <div>
              MENU
            </div>
          )}
        </SwiperSlide>
        {projects.map((project) => (
          <SwiperSlide key={project.id} data-project-id={project.id}>
            {({ isActive }) => (
              <div className={isActive ? 'active' : ''}>
                <img src={"/image/uploads/images/project/card/" + project.illustrationCardName} alt={project.title} title={project.title}/>
              </div>
            )}
          </SwiperSlide>
        ))}
        <SwiperSlide key={"all"}>
          {({ isActive }) => (
            <div className={isActive ? 'active' : ''}>
              ALL
            </div>
          )}
        </SwiperSlide>
      </Swiper>
    </nav>
  );
}