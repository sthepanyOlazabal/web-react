import BookOutlinedIcon from "@material-ui/icons/BookOutlined";
import DriveEtaOutlinedIcon from "@material-ui/icons/DriveEtaOutlined";
import EmojiObjectsOutlinedIcon from "@material-ui/icons/EmojiObjectsOutlined";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import LibraryMusicOutlinedIcon from "@material-ui/icons/LibraryMusicOutlined";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import TheatersOutlinedIcon from "@material-ui/icons/TheatersOutlined";
import AccesosAplicacion from "../pages/accesos-aplicacion";
import Cursos from "../pages/cursos";
import VideosDesarrolloCircuito from "../pages/desarrollo-circuito";
import Home from "../pages/home";
import PodcastsCajaAutomatica from "../pages/Podcasts/caja-automatica";
import PodcastsCajaMecanica from "../pages/Podcasts/caja-mecanica";
import PodcastsCircuito from "../pages/Podcasts/circuito";
import PodcastsClasesTeoricas from "../pages/Podcasts/clases-teoricas";
import TipsDriverAuto from "../pages/tips-driver/auto";
import TipsDriverExamenes from "../pages/tips-driver/examen";
import VideosCajaAutomatica from "../pages/videos/practicas-caja-automatica";
import VideosCajaMecanica from "../pages/videos/practicas-caja-mecanica";
import VideosManejoDefensivo from "../pages/videos/teoria-manejo-defensivo";
import VideosMecanicaPreventiva from "../pages/videos/teoria-mecanica-preventiva";
import VideosReglamentoTransito from "../pages/videos/teoria-reglamento-transito";

const OPCIONES_MENU = [
  {
    titulo: "Inicio",
    ruta: "/",
    pagina: Home,
    icono: HomeOutlinedIcon,
  },
  {
    titulo: "Cursos",
    ruta: "/cursos",
    pagina: Cursos,
    icono: BookOutlinedIcon,
  },
  {
    titulo: "Acceso a la aplicación",
    ruta: "/accesos-aplicacion",
    pagina: AccesosAplicacion,
    icono: LockOutlinedIcon,
  },
  {
    titulo: "Podcasts",
    icono: LibraryMusicOutlinedIcon,
    items: [
      {
        titulo: "Caja Automática",
        ruta: "/podcasts/caja-automatica",
        pagina: PodcastsCajaAutomatica,
      },
      {
        titulo: "Caja Mecánica",
        ruta: "/podcasts/caja-mecanica",
        pagina: PodcastsCajaMecanica,
      },
      {
        titulo: "Circuito",
        ruta: "/podcasts/circuito",
        pagina: PodcastsCircuito,
      },
      {
        titulo: "Clases Teóricas",
        ruta: "/podcasts/clases-teoricas",
        pagina: PodcastsClasesTeoricas,
      },
    ],
  },
  {
    titulo: "Tips Driver",
    icono: EmojiObjectsOutlinedIcon,
    items: [
      {
        titulo: "Del Auto",
        ruta: "/tips-driver/auto",
        pagina: TipsDriverAuto,
      },
      {
        titulo: "De los Exámenes",
        ruta: "/tips-driver/examenes",
        pagina: TipsDriverExamenes,
      },
    ],
  },
  {
    titulo: "Videos",
    icono: TheatersOutlinedIcon,
    items: [
      {
        titulo: "Práctica",
        items: [
          {
            titulo: "Caja Automática",
            ruta: "/videos/practica/caja-automatica",
            pagina: VideosCajaAutomatica,
          },
          {
            titulo: "Caja Mecánica",
            ruta: "/videos/practica/caja-mecanica",
            pagina: VideosCajaMecanica,
          },
        ],
      },
      {
        titulo: "Teoría",
        items: [
          {
            titulo: "Reglamento de Tránsito",
            ruta: "/videos/teoria/reglamento-transito",
            pagina: VideosReglamentoTransito,
          },
          {
            titulo: "Mecánica de Preventiva",
            ruta: "/videos/teoria/mecanica-preventiva",
            pagina: VideosMecanicaPreventiva,
          },
          {
            titulo: "Manejo Defensivo",
            ruta: "/videos/teoria/manejo-defensivo",
            pagina: VideosManejoDefensivo,
          },
        ],
      },
    ],
  },
  {
    titulo: "Desarrollo de Circuito",
    ruta: "/desarrollo-circuito",
    pagina: VideosDesarrolloCircuito,
    icono: DriveEtaOutlinedIcon,
  },
];

export default OPCIONES_MENU;
