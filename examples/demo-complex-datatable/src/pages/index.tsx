import React, { useState } from 'react';
import Head from 'next/head';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import {
  Avatar,
  AvatarGroup,
  Chip,
  Collapse,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  Switch,
  TableCell,
  TableCellProps,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
import {
  AssignmentLateOutlined,
  AssignmentTurnedInOutlined,
  Done,
  KeyboardArrowDown,
  KeyboardArrowUp,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { CourseName, Instructor, OfflineClass, OfflineClassChild } from '../types';
import ComplexDataTable, { HeadCell, StyledTableBody, StyledTableCell } from 'complex-datatable';

const inter = Inter({ subsets: ['latin'] });

const headCells: HeadCell<OfflineClass>[] = [
  {
    id: 'childs',
    numeric: false,
    disablePadding: false,
    label: '',
    align: 'left',
  },
  {
    id: 'id',
    numeric: true,
    disablePadding: false,
    label: 'ID',
    align: 'left',
  },
  {
    id: 'courseName',
    numeric: false,
    disablePadding: false,
    align: 'left',
    label: 'Course Name',
  },
  {
    id: 'classDay',
    numeric: false,
    disablePadding: false,
    align: 'left',
    label: 'Class Day',
  },
  {
    id: 'instructors',
    numeric: false,
    disablePadding: false,
    align: 'left',
    label: 'Instructors',
  },
  {
    id: 'enrolled',
    numeric: true,
    disablePadding: false,
    align: 'left',
    label: 'Enrolled',
  },
  {
    id: 'date',
    numeric: false,
    disablePadding: false,
    align: 'left',
    label: 'Date',
  },
  {
    id: 'startTime',
    numeric: false,
    disablePadding: false,
    align: 'left',
    label: 'Start Time',
  },
  {
    id: 'endTime',
    numeric: false,
    disablePadding: false,
    align: 'left',
    label: 'End Time',
  },
];

const collapseHeadCells: HeadCell<OfflineClassChild>[] = [
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    align: 'left',
    label: 'Name',
  },
  {
    id: 'age',
    numeric: true,
    disablePadding: false,
    align: 'left',
    label: 'Age',
  },
  {
    id: 'dateOfBirth',
    numeric: false,
    disablePadding: false,
    align: 'left',
    label: 'Date of Birth',
  },
  {
    id: 'attendance',
    numeric: false,
    disablePadding: false,
    align: 'left',
    label: 'Attendance',
  },
  {
    id: 'actions',
    numeric: false,
    disablePadding: false,
    align: 'left',
    label: '',
  },
];

const StyledImage = styled('img')(({ theme }) => ({
  height: 40,
  width: 50,
  marginRight: 4,
  borderRadius: 5,
}));

const StyledAttendanceTableCell = styled(TableCell)<TableCellProps>(({ theme }) => ({
  textTransform: 'initial',
  color: theme.palette.common.black,
  '&.MuiTableCell-root:last-child': {
    padding: 0,
  },
}));

export default function Home() {
  const [columnVisibilityModel, setColumnVisibilityModel] = useState<any>({
    id: true,
  });
  const [isOpenAttendances, setOpenAttendances] = useState<any>({});
  const [isOpenAbsentModal, setOpenAbsentModal] = useState<boolean>(false);
  const [isOpenDeleteAbsentModal, setOpenDeleteAbsentModal] = useState<boolean>(false);
  const [note, setNote] = useState<string>();
  const [type, setType] = useState<string>('licensed');

  const createData = (
    childs: OfflineClassChild[],
    id: number,
    courseName: CourseName,
    classDay: string,
    instructors: Instructor[],
    enrolled: number,
    date: string,
    startTime: string,
    endTime: string
  ): OfflineClass => {
    return {
      childs,
      id,
      courseName,
      classDay,
      instructors,
      enrolled,
      date,
      startTime,
      endTime,
    };
  };

  const rows = [
    createData(
      [
        {
          avatarUrl: '/images/avatars/1.png',
          name: 'Remy Sharp',
          age: 17,
          dateOfBirth: '18/10/2005',
          attendance: 'Present',
          actions: '',
        } as OfflineClassChild,
        {
          avatarUrl: '/images/avatars/4.png',
          name: 'Travis Howard',
          age: 19,
          dateOfBirth: '20/05/2003',
          attendance: 'Present',
          actions: '',
        } as OfflineClassChild,
      ],
      1234,
      {
        coverUrl: 'https://www.collinsdictionary.com/images/full/school_309241295.jpg',
        name: 'Harbouring Art 1 1',
      } as CourseName,
      'Monday',
      [
        {
          name: 'Remy Sharp',
          avatarUrl: '/images/avatars/1.png',
        } as Instructor,
        {
          name: 'Travis Howard',
          avatarUrl: '/images/avatars/2.png',
        } as Instructor,
        {
          name: 'Cindy Baker',
          avatarUrl: '/images/avatars/3.png',
        } as Instructor,
        {
          name: 'Agnes Walker',
          avatarUrl: '/images/avatars/4.png',
        } as Instructor,
        {
          name: 'Trevor Henderson',
          avatarUrl: '/images/avatars/5.png',
        } as Instructor,
      ],
      10,
      '05/06/2023',
      '10:00 AM',
      '12:00 PM'
    ),
    createData(
      [
        {
          avatarUrl: '/images/avatars/5.png',
          name: 'Trevor Henderson',
          age: 17,
          dateOfBirth: '18/10/2005',
          attendance: 'Present',
          actions: '',
        } as OfflineClassChild,
      ],
      4567,
      {
        coverUrl: 'https://www.collinsdictionary.com/images/full/school_309241295.jpg',
        name: 'Advanced Art 2',
      } as CourseName,
      'Thursday',
      [
        {
          name: 'Remy Sharp',
          avatarUrl: '/images/avatars/1.png',
        } as Instructor,
        {
          name: 'Travis Howard',
          avatarUrl: '/images/avatars/2.png',
        } as Instructor,
        {
          name: 'Cindy Baker',
          avatarUrl: '/images/avatars/3.png',
        } as Instructor,
        {
          name: 'Agnes Walker',
          avatarUrl: '/images/avatars/4.png',
        } as Instructor,
        {
          name: 'Trevor Henderson',
          avatarUrl: '/images/avatars/5.png',
        } as Instructor,
      ],
      10,
      '20/07/2023',
      '06:00 AM',
      '11:00 AM'
    ),
  ];

  const handleUpdateAttendance = (value: boolean, params?: any) => {
    setOpenDeleteAbsentModal(value);
  };

  const handleCheckInAttendance = async (value: boolean, params?: any) => {
    setOpenAbsentModal(value);
  };

  const renderInstructorsCell = (id: number, instructors: Instructor[]) => {
    return (
      <AvatarGroup max={4}>
        {instructors.map((e) => {
          return <Avatar key={`${id}-${e.name}`} alt={e.name} src={e.avatarUrl} />;
        })}
      </AvatarGroup>
    );
  };

  const renderRowCells = (row: OfflineClass) => {
    return (
      <>
        <StyledTableCell key={`childs-${row.id}`}>
          <IconButton
            onClick={() => {
              setOpenAttendances((prev: any[]) => ({
                ...prev,
                [row?.id]: !prev[row?.id],
              }));
            }}
          >
            {isOpenAttendances[row.id] ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </StyledTableCell>
        {columnVisibilityModel.id && (
          <StyledTableCell key={row.id} align="left">
            {row.id}
          </StyledTableCell>
        )}
        <StyledTableCell key={row.courseName.name} align="left">
          {
            <Grid container spacing={2} sx={{ margin: 0, alignItems: 'center' }}>
              {row.courseName.coverUrl && <StyledImage src={row.courseName.coverUrl} />}
              <Typography>{row.courseName.name}</Typography>
            </Grid>
          }
        </StyledTableCell>
        <StyledTableCell key={row.classDay} align="left">
          {row.classDay}
        </StyledTableCell>
        <StyledTableCell key={`instructors-${row.id}`} align="left">
          {renderInstructorsCell(row.id, row.instructors)}
        </StyledTableCell>
        <StyledTableCell key={`enrolled-${row.id}`} align="left">
          {row.enrolled}
        </StyledTableCell>
        <StyledTableCell key={`date-${row.id}`} align="left">
          {row.date}
        </StyledTableCell>
        <StyledTableCell key={`startTime-${row.id}`} align="left">
          {row.startTime}
        </StyledTableCell>
        <StyledTableCell key={`endTime-${row.id}`} align="left">
          {row.endTime}
        </StyledTableCell>
      </>
    );
  };

  const renderAttendance = (type: string) => {
    return (
      <Chip
        icon={<Done style={{ color: 'white' }} />}
        color="success"
        label={type}
        style={{ color: 'white' }}
        size="small"
      />
    );
  };

  const renderAttendanceAction = () => {
    return (
      <>
        <Tooltip title={'Mark as absent'}>
          <IconButton
            aria-label=""
            color="error"
            onClick={() => {
              handleCheckInAttendance(true);
            }}
          >
            <AssignmentLateOutlined />
          </IconButton>
        </Tooltip>
        <Tooltip title={'Mark as present'}>
          <IconButton aria-label="" color="error" onClick={() => handleUpdateAttendance(true)}>
            <AssignmentTurnedInOutlined />
          </IconButton>
        </Tooltip>
      </>
    );
  };

  const renderCollapseRowCells = (id: number, row: OfflineClassChild) => {
    return (
      <>
        <StyledTableCell key={`${id}-${row.name}`} align="left">
          {
            <Grid container spacing={2} sx={{ margin: 0, alignItems: 'center' }}>
              <Avatar alt={row.name} src={row.avatarUrl} sx={{ marginRight: 2 }} />
              <Typography>{row.name}</Typography>
            </Grid>
          }
        </StyledTableCell>
        <StyledTableCell key={`${id}-${row.age}`} align="left">
          {row.age}
        </StyledTableCell>
        <StyledTableCell key={`${id}-${row.dateOfBirth}`} align="left">
          {row.dateOfBirth}
        </StyledTableCell>
        <StyledTableCell key={`${id}-${row.attendance}`} align="left">
          {renderAttendance(row.attendance)}
        </StyledTableCell>
        <StyledTableCell key={`${id}-actions`} align="right">
          {renderAttendanceAction()}
        </StyledTableCell>
      </>
    );
  };

  const renderCollapseRow = (row: OfflineClass) => {
    return (
      <TableRow>
        <StyledAttendanceTableCell colSpan={9}>
          <Collapse in={isOpenAttendances[row.id]} timeout="auto">
            <ComplexDataTable
              dense
              defaultKey="name"
              enabledNavigate={false}
              headCells={collapseHeadCells}
              rows={row.childs}
              renderRowCells={(child: OfflineClassChild) => renderCollapseRowCells(row.id, child)}
            />
          </Collapse>
        </StyledAttendanceTableCell>
      </TableRow>
    );
  };

  return (
    <>
      <Head>
        <title>Complex Data Table</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <div className={styles.description}>
          <p>Get started with Complex Data Table</p>
        </div>
        <Grid container spacing={6}>
          <Grid item xs={9}>
            <Typography variant="h4" fontWeight="bold">
              Offline Classes
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <FormGroup sx={{ width: 'fit-content', paddingBottom: '10px' }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={columnVisibilityModel.id}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      const { checked } = event.target;
                      setColumnVisibilityModel({ id: checked });
                    }}
                  />
                }
                label={<Typography>Visible ID column</Typography>}
              />
            </FormGroup>

            <ComplexDataTable
              dense
              defaultKey="id"
              headCells={headCells}
              rows={rows}
              renderRowCells={renderRowCells}
              renderCollapseRow={renderCollapseRow}
            />
          </Grid>
        </Grid>
      </main>
    </>
  );
}
