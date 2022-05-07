import React, { Fragment } from 'react';
import { ABoxAll, ABoxBody, ABoxFooter, ABoxHeader, ABoxHeaderTitle } from '../../components/Boxes';
import { ABreadcumb } from '../../components/Breadcumbs';
import { AButtomAdd } from '../../components/Buttons';
import { AInputSearch } from '../../components/Forms/Inputs';
import { IconContext } from 'react-icons';
import { IoTimeSharp } from "react-icons/io5";
import { ATable, ATd, ATh, ATr } from '../../components/Tables';
import { Pagination } from '../../components/Pagination';

const Ciclo = ({ loading }) => {

  return (
    <Fragment>
      <ABoxAll>
        <ABoxHeader>
          <ABoxHeaderTitle>
            <IconContext.Provider value={{ className: "text-xl font-medium" }}>
              <div>
                <IoTimeSharp />
              </div>
            </IconContext.Provider>
            <h1 className='ml-1 text-lg font-medium'>Ciclos</h1>
          </ABoxHeaderTitle>
          <ABreadcumb links={
            [
              { label: "Ciclos", url: "/ciclos", linked: false }
            ]
          } />
        </ABoxHeader>

        <ABoxHeader>
          <AButtomAdd />
          <AInputSearch place="Buscar por ciclo" />
        </ABoxHeader>

        <ABoxBody>
          <ATable>
            <ATr thead={true}>
              <ATh>Ciclo</ATh>
              <ATh>Ativo</ATh>
              <ATh>Início</ATh>
              <ATh>Término</ATh>
              <ATh>Titulo</ATh>
              <ATh></ATh>
            </ATr>
            <ATr thead={false}>
              <ATd>1</ATd>
              <ATd>yes/no</ATd>
              <ATd>data inicio</ATd>
              <ATd>data fim</ATd>
              <ATd>semanas</ATd>
              <ATd>
              </ATd>
            </ATr>
          </ATable>
        </ABoxBody>
        <ABoxFooter>
          <Pagination />
        </ABoxFooter>
      </ABoxAll>
    </Fragment>
  );
  
};

export default Ciclo;
