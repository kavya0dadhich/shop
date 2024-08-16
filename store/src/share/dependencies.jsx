// dependencies.js
// React and hooks
import React, { useState, useEffect, useRef } from "react";

// React Router
import { Link, useLocation, useNavigate } from "react-router-dom";

// PrimeReact Components
import { Divider } from "primereact/divider";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { BreadCrumb } from "primereact/breadcrumb";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { Toast } from "primereact/toast";
import { Tooltip } from 'primereact/tooltip';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Dialog } from 'primereact/dialog';
import { Stepper } from 'primereact/stepper';
import { StepperPanel } from 'primereact/stepperpanel';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';

        
// highChart
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

// Formik
import { useFormik, Form, Formik } from "formik";

// PrimeReact APIs
import { FilterMatchMode } from "primereact/api";

// Custom Components
import { Spinner } from "../components/spinner";
// Moment.js
import moment from "moment";

// React Icons
import { BiSolidPurchaseTag, BiSolidCategory } from "react-icons/bi";
import { FcSalesPerformance } from "react-icons/fc";
import { GiVerticalFlip } from "react-icons/gi";
import { ImProfile } from "react-icons/im";
import { MdCategory, MdOutlineWork } from "react-icons/md";
import { CiLogout, CiMenuFries, CiShop } from "react-icons/ci";
import { AiTwotoneBuild, AiFillEdit } from "react-icons/ai";
import { FaEye } from "react-icons/fa";
import { IoMdSearch, IoMdSettings } from "react-icons/io";
import { IoNotificationsOutline } from "react-icons/io5";
import { RiArrowGoBackFill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";

// Export everything
export {
  HighchartsReact,
  Highcharts,
  React,
  useState,
  useEffect,
  useRef,
  Link,
  useLocation,
  Stepper,
  useNavigate,
  Divider,
  Button,
  DataTable,
  Column,
  BreadCrumb,
  StepperPanel,
  Dropdown,
  Calendar,
  Dialog,
  Toast,
  useFormik,
  Form,
  Checkbox,
  Formik,
  FilterMatchMode,
  Spinner,
  moment,
  BiSolidPurchaseTag,
  BiSolidCategory,
  FcSalesPerformance,
  GiVerticalFlip,
  ImProfile,
  MdCategory,
  MdOutlineWork,
  CiLogout,
  CiMenuFries,
  ConfirmDialog,
  confirmDialog,
  CiShop,
  AiTwotoneBuild,
  AiFillEdit,
  FaEye,
  IoMdSearch,
  IoMdSettings,
  IoNotificationsOutline,
  RiArrowGoBackFill,
  MdDelete,
  Tooltip,
};
