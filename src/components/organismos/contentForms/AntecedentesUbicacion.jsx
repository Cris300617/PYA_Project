import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Map, Marker } from "@vis.gl/react-google-maps";
import { Icon } from "@iconify/react";
import { supabase } from "../../../supabase/supabase.config";

export function AntecedentesUbicacion({ data, setData }) {
  const [zonas, setZonas] = useState([]);
  const [mostrarLista, setMostrarLista] = useState(false);
  const [loadingZonas, setLoadingZonas] = useState(false);
  const autocompleteRef = useRef(null);


  const cargarDelegaciones = async () => {
    if (zonas.length > 0) {
      setMostrarLista(true);
      return;
    }

    setLoadingZonas(true);

    const { data: zonasData, error } = await supabase
      .from("listado_zonas")
      .select("id, delegacion, region, zona")
      .order("delegacion", { ascending: true })
      .limit(60);

    if (!error) {
      setZonas(zonasData);
      setMostrarLista(true);
    }

    setLoadingZonas(false);
  };

  const obtenerUbicacion = () => {
    if (!navigator.geolocation) {
      alert("La geolocalización no es compatible con este navegador");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setData({
          ...data,
          geo_latitud: position.coords.latitude,
          geo_longitud: position.coords.longitude,
          geo_altitud: position.coords.altitude ?? 0,
        });
      },
      () => {
        alert("No se pudo obtener la ubicación");
      }
    );
  };

  const location =
    data.geo_latitud && data.geo_longitud
      ? { lat: data.geo_latitud, lng: data.geo_longitud }
      : null;

  useEffect(() => {
  const handleClickOutside = (event) => {
    if (
      autocompleteRef.current &&
      !autocompleteRef.current.contains(event.target)
    ) {
      setMostrarLista(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);


  return (
    <Container>

    <div className="field autocomplete" ref={autocompleteRef}>
          <label>Delegación</label>
          <input
            required
            value={data.delegacion || ""}
            onChange={(e) =>
              setData({ ...data, delegacion: e.target.value })
            }
            onFocus={cargarDelegaciones} 
          />

          {mostrarLista && (
            <ul className="suggestions">
              {loadingZonas && <li className="loading">Cargando...</li>}

              {!loadingZonas &&
                zonas.map((item) => (
                  <li
                    key={item.id}
                    onClick={() => {
                      setData({
                        ...data,
                        delegacion: item.delegacion,
                        region: item.region,
                        zona: item.zona,
                      });
                      setMostrarLista(false);
                    }}
                  >
                    <strong>{item.delegacion}</strong>
                    <span>
                      {item.region} · {item.zona}
                    </span>
                  </li>
                ))}
            </ul>
          )}
        </div>
      <section className="box">
        <div className="field">
          <label>Región</label>
          <input value={data.region || ""} disabled />
        </div>

        <div className="field">
          <label>Zona</label>
          <input value={data.zona || ""} disabled />
        </div>

        

        <div className="field">
          <label>Dirección</label>
          <input
            required
            value={data.direccion || ""}
            onChange={(e) =>
              setData({ ...data, direccion: e.target.value })
            }
          />
        </div>

        <div className="field">
          <label>Latitud</label>
          <input
            required
            type="number"
            step="any"
            value={data.geo_latitud ?? ""}
            onChange={(e) =>
              setData({
                ...data,
                geo_latitud:
                  e.target.value === "" ? null : parseFloat(e.target.value),
              })
            }
          />
        </div>

        <div className="field">
          <label>Longitud</label>
          <input
            required
            type="number"
            step="any"
            value={data.geo_longitud ?? ""}
            onChange={(e) =>
              setData({
                ...data,
                geo_longitud:
                  e.target.value === "" ? null : parseFloat(e.target.value),
              })
            }
          />
        </div>

        <div className="field">
          <label>Altitud</label>
          <input
            type="number"
            step="any"
            value={data.geo_altitud ?? ""}
            onChange={(e) =>
              setData({
                ...data,
                geo_altitud:
                  e.target.value === "" ? 0 : parseFloat(e.target.value),
              })
            }
          />
        </div>

        <div className="field">
          <label>&nbsp;</label>
          <button type="button" className="geo-btn" onClick={obtenerUbicacion}>
            <Icon icon="mdi:crosshairs-gps" width="20" />
            <span>Usar mi ubicación</span>
          </button>
        </div>

        <div className="map-wrapper">
          {location ? (
            <Map
              defaultZoom={14}
              defaultCenter={location}
              gestureHandling="greedy"
              disableDefaultUI
            >
              <Marker position={location} />
            </Map>
          ) : (
            <div className="map-placeholder">
              Presiona el botón para mostrar el mapa
            </div>
          )}
        </div>
      </section>
    </Container>
  );
}




const Container = styled.div`
  width: 100%;

  .box {
    display: grid;
    grid-template-columns: repeat(3, minmax(300px, 1fr)); 
    column-gap: 20px;
    row-gap: 16px;
  }

  .field {
    display: flex;
    flex-direction: column;
    gap: 6px; 
  }

  input {
    width: 100%; 
    padding: 12px 14px;
    border-radius: 10px;
    border: 1px solid #cbd5e1;
    font-size: 0.9rem;
    background: #fff;
    box-sizing: border-box;
  }
  input:focus {
    outline: none;
    border-color: #15e47c;
    box-shadow: 0 0 0 2px rgba(21, 228, 124, 0.2);
  }

  label {
    font-size: 0.8rem;
    font-weight: 600;
    color: #475569;
    margin-bottom: 5px;
  }

 .geo-btn {
  height: 44px;
  padding: 0 16px;
  border-radius: 12px;
  border: none;

  background: linear-gradient(135deg, #15e47c, #0ecb6a);
  color: #064e3b;

  font-weight: 600;
  font-size: 0.9rem;

  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 6px 14px rgba(21, 228, 124, 0.25);
}

.geo-btn svg {
  color: #064e3b;
}

.geo-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 18px rgba(21, 228, 124, 0.35);
}

.geo-btn:active {
  transform: translateY(0);
  box-shadow: 0 4px 10px rgba(21, 228, 124, 0.25);
}

.geo-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}


  .map-wrapper {
    grid-column: 3;
    grid-row: 1 / span 4;
    height: 100%;
    min-height: 260px;
    max-width: 280px;
    border-radius: 16px;
    overflow: hidden;
    border: 2px solid #e5e7eb;
  }

  .map-placeholder {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #64748b;
    font-size: 0.85rem;
  }

  .autocomplete {
  position: relative;
  max-width: 620px;
  margin-bottom: 20px;
}

.suggestions {
  color:black;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;

  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  margin-top: 6px;

  max-height: 220px;
  overflow-y: auto;
  z-index: 20;

  box-shadow: 0 10px 25px rgba(0,0,0,0.08);
}

.suggestions li {
  padding: 10px 14px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
}

.suggestions li:hover {
  background: #f1f5f9;
}

.suggestions li span {
  font-size: 0.75rem;
  color: #64748b;
}


  @media (max-width: 1024px) {
    .box {
      grid-template-columns: 1fr;
    }

    .map-wrapper {
      grid-column: auto;
      grid-row: auto;
      height: 240px;
    }
  }


  @media (max-width: 640px) {
    .box {
      gap: 14px;
    }

    input {
      font-size: 0.85rem;
      padding: 11px 12px;
      min-width: 160px;
    }
  }
`;
