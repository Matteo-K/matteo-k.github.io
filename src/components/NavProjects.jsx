import { useData } from '../hooks/useData';
import { DataStatut } from '../enums/DataStatut';

import { A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import { useState } from 'react';
import CardLoader from './CardLoader';

export default function NavProjects(props) {
  const { isLoading, error, getProjects } = useData();
  const [ swipperRef, setSwipperRef ] = useState(null);

  if (isLoading) return <div>🔄 Chargement...</div>;
  if (error) return <div>❌ Erreur: {error}</div>;
  const projects = !isLoading && !error ? getProjects({
    where: { statut: DataStatut.ACTIF },
    order: { priority: 1},
    limit: 10
  }) : [];

  const slideTo = (index) => {
    swipperRef.slideTo(index, 0);
  }

  const setSlide = (project) => {
    props.setProject(project);
  };

  const getInitialSlide = () => {
    const params = new URLSearchParams(window.location.search);
    const slide = params.get("slide");

    if (slide === "last") return projects.length + 1;
    const index = parseInt(slide, 10);
    return isNaN(index) ? 0 : index;
  };

  const updateURL = (index) => {
    const params = new URLSearchParams(window.location.search);

    if (index === projects.length + 1) {
      params.set("slide", "last");
    } else {
      params.set("slide", index);
    }

    window.history.pushState({}, "", `?${params.toString()}`);
  };


  return (
    <nav id="home-nav-projects">
      <Swiper
        modules={[A11y]}
        slidesPerView={1}
        width="106"
        centeredSlides={true}
          coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2,
          slideShadows: false,
        }}
        spaceBetween={30}
        initialSlide={getInitialSlide()}
        onSwiper={setSwipperRef}
        onSlideChange={(swiper) => {
          const index = swiper.activeIndex;
          updateURL(index);
          const project = projects[swiper.activeIndex - 1];
          if (project === undefined) {
            if (swiper.activeIndex === projects.length + 1) {
              return setSlide("all")
            }
          }
          return setSlide(project);
        }}
      >
        <SwiperSlide key={0} onClick={() => slideTo(0)}>
          {({ isActive }) => (
            <>
              <div className={"card-project size " + ( isActive ? 'active' : '' )}>
                <img src="/image/icons/menu.svg" alt="Menu" title="Menu" className='icon'/>
              </div>
              { isActive && 
                <div>
                  Bienvenue
                </div>
              }
            </>
          )}
        </SwiperSlide>
        {projects.map((project, index) => (
          <SwiperSlide key={index + 1} data-project-id={project.id} onClick={() => slideTo(index + 1)}>
            {({ isActive }) => (
              <>
                <div className={"card-project size " + ( isActive ? 'active' : '' )}>
                  <img src={"/image/uploads/images/project/card/" + project.illustrationCardName} alt={project.title} title={project.title}/>
                </div>
                { isActive && 
                  <div>
                    { project.title }
                  </div>
                }
              </>
            )}
          </SwiperSlide>
        ))}
        <SwiperSlide key={projects.length + 1} onClick={() => slideTo(projects.length + 1)}>
          {({ isActive }) => (
            <>
              <div className={"card-project size " + ( isActive ? 'active' : '' )}>
                <img src="/image/icons/projects.svg" alt="Projects" title="Projects" className='icon'/>
              </div>
              { isActive && 
                <div>
                  Projets
                </div>
              }
            </>
          )}
        </SwiperSlide>
      </Swiper>
    </nav>
  );
}